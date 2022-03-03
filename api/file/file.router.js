const express = require('express');
const file = express.Router();
const FieldValue = require('firebase-admin').firestore.FieldValue
const { getFirestore } = require('firebase-admin/firestore');

const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    })
});

const db = getFirestore();

// Create
file.post('/', async (req, res) => {
    const { uid, file } = req.body;

    // Generate random ID
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    await db.collection('files').doc(uid).set({
        [id]: {
            file: file,
            date: new Date()
        }
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
            file: file,
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

// Remove the 'capital' field from the document
    await fileRef.update({
        [fileId]: FieldValue.delete()
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

// Find all
file.get('/', async (req, res) => {
    await db.collection('files').get().then(snapshot => {
        const files = [];

        snapshot.forEach(doc => {
            files.push({
                uid: doc.id,
                ...doc.data()
            });
        });

        res.status(200).send({
            message: files
        });
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

module.exports = file;