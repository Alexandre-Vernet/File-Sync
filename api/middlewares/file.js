const { getFirestore } = require("firebase-admin/firestore");
const schedule = require("node-schedule");
const admin = require("firebase-admin");
const FieldValue = require('firebase-admin').firestore.FieldValue

const ifFileExists = async (req, res, next) => {
    const db = getFirestore();

    const { uid, file } = req.body;

    // Check if file already exists in the database
    const fileRef = db.collection('files').doc(uid);
    const fileSnapshot = await fileRef.get();

    for (const dataKey in fileSnapshot.data()) {
        const existingFile = fileSnapshot.data()[dataKey];
        if (existingFile.name === file.name) {
            return res.status(400).json({
                message: 'This file already exists'
            });
        }
    }

    next();
}

const calculateTotalUserFilesSize = async (req, res, next) => {
    const db = getFirestore();

    const { uid, file } = req.body;

    // Get all files of the user
    const filesRef = db.collection('files').doc(uid);
    const filesSnapshot = await filesRef.get();
    const files = filesSnapshot.data();

    // Calculate total size of the user's files
    let totalSize = 0;
    for (const dataKey in files) {
        const file = files[dataKey];
        totalSize += file.size;
    }

    // Check if the user has enough space to upload the file (5GB)
    if (totalSize + file.size > 5368709120) {
        return res.status(400).json({
            message: 'You don\'t have enough space to upload this file'
        });
    }

    next();
}

const checkFileSize = (req, res, next) => {
    const { file } = req.body;
    // If file is bigger than 1GB
    if (file.size > 1073741824) {
        return res.status(400).json({
            message: 'File size must be less than 1GB'
        });
    }
    next();
}


const job = '0 20 * * *';   // Every day at 20:00
schedule.scheduleJob(job, async () => {
    const db = getFirestore();

    // Get all files
    const filesRef = db.collection('files');
    const files = await filesRef.get();

    files.forEach(((doc) => {
        const files = doc.data();

        for (const dataKey in files) {
            // Get current date
            const currentDate = new Date();

            // Get file name & date
            const fileName = files[dataKey].name;
            const fileDate = new Date(files[dataKey].date);

            // Get difference between current date and file date
            const diff = Math.abs(currentDate - fileDate);

            // Convert difference in days
            const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

            // If file is older than 7 days, delete it
            if (diffDays >= 7) {
                // Delete file from firestore
                const fileRef = db.collection('files').doc(doc.id);

                fileRef.update({
                    [dataKey]: FieldValue.delete()
                }).then(async () => {
                    // Delete file from storage
                    await admin.storage().bucket().file(`files/${ doc.id }/${ fileName }`).delete();
                });
            }
        }
    }));
});

module.exports = { calculateTotalUserFilesSize, ifFileExists, checkFileSize };
