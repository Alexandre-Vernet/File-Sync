const { getFirestore } = require("firebase-admin/firestore");

async function ifFileExists(req, res, next) {
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

async function calculateTotalUserFilesSize(req, res, next) {
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

function checkFileSize(req, res, next) {
    const { file } = req.body;
    // If file is bigger than 1GB
    if (file.size > 1073741824) {
        return res.status(400).json({
            message: 'File size must be less than 1GB'
        });
    }
    next();
}

module.exports = { calculateTotalUserFilesSize, ifFileExists, checkFileSize };