const express = require('express');
const file = express.Router();
const FieldValue = require('firebase-admin').firestore.FieldValue
const { getFirestore } = require('firebase-admin/firestore');
const schedule = require("node-schedule");

const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = getFirestore();

// Create
file.post('/', async (req, res) => {
    const { uid, file } = req.body;

    // Check if file already exists in the database
    const fileRef = db.collection('files').doc(uid);
    const fileSnapshot = await fileRef.get();

    for (const dataKey in fileSnapshot.data()) {
        const file = fileSnapshot.data()[dataKey];
        if (file.name === req.body.file.name) {
            return res.status(400).json({
                message: 'File already exists'
            });
        }
    }

    // Generate random ID
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    await db.collection('files').doc(uid).set({
        [id]: file
    }, { merge: true }).then(() => {
        res.status(201).send({
            message: 'File uploaded successfully'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});


// Read
file.get('/:uid/:fileId', async (req, res) => {
    const { uid, fileId } = req.params;

    // Get all files
    const fileRef = db.collection('files').doc(uid);
    const files = (await fileRef.get()).data();

    // Find fileId
    const file = files[fileId];

    res.send({ file });
});

// Update
file.put('/:uid/:fileId', async (req, res) => {
    const { uid, fileId } = req.params;
    const { file } = req.body;

    const fileRef = db.collection('files').doc(uid);
    await fileRef.update({
        [fileId]: {
            name: file.name,
            type: file.type,
            date: new Date()
        }
    }).then(() => {
        res.status(200).send({
            message: 'File updated successfully'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

// Delete
file.delete('/:uid/:fileId', async (req, res) => {
    const { uid, fileId } = req.params;

    const fileRef = db.collection('files').doc(uid);

    // Get filename
    const fileSnapshot = await fileRef.get();
    const file = fileSnapshot.data()[fileId];
    const fileName = file.name;


    // Delete file from firestore
    await fileRef.update({
        [fileId]: FieldValue.delete()
    }).then(async () => {
        // Delete file from storage
        await admin.storage().bucket().file(`files/${ fileName }`).delete().then(() => {
            res.status(200).send({
                message: 'File deleted successfully'
            })
        }).catch(error => {
            res.status(500).send({
                message: error.message
            });
        })
    })
});

// Find all
file.get('/:uid', async (req, res) => {
    const { uid } = req.params;

    // Get user files
    const fileRef = db.collection('files').doc(uid);
    const doc = await fileRef.get();

    // If user has no files
    if (doc.exists) {
        const filesId = Object.keys(doc.data());
        const files = [];

        // Get all files with their ID
        filesId.forEach(id => {
            files.push(doc.data()[id]);
            files[files.length - 1].id = id;
        });

        // Sort files by date
        files.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        res.send(files);
    }
});


const job = '0 20 * * *';   // Every day at 20:00
schedule.scheduleJob(job, async () => {

    // Get all files
    const filesRef = db.collection('files');
    const users = await filesRef.get();
    const files = users.docs.map(doc => doc.data());

    users.forEach(user => {
        files.forEach((file) => {
            const filesId = Object.keys(file);

            filesId.forEach(async (fileId) => {
                // Get current date
                const currentDate = new Date();

                // Get file name & date
                const fileName = file[fileId].name;
                const fileDate = new Date(file[fileId].date);

                // Get difference between current date and file date
                const diff = Math.abs(currentDate - fileDate);

                // Convert difference in days
                const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

                // If file is older than 7 days, delete it
                if (diffDays >= 7) {
                    // Delete file from firestore
                    const fileRef = db.collection('files').doc(user.id);

                    await fileRef.update({
                        [fileId]: FieldValue.delete()
                    }).then(async () => {
                        // Delete file from storage
                        await admin.storage().bucket().file(`files/${ fileName }`).delete();
                    });
                }
            });
        });
    });
});

module.exports = file;