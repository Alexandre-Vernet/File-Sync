const express = require('express');
const router = express.Router();

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
router.post('/file', async (req, res) => {
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
router.get('/file/:uid/:fileId', async (req, res) => {
    const { uid, fileId } = req.params;

    // Get all files
    const cityRef = db.collection('files').doc(uid);
    const files = (await cityRef.get()).data();

    // Find fileId
    const file = files[fileId];

    res.send({ file });
});

// Update
router.put('/file/:uid/:fileId', async (req, res) => {
    const { uid, fileId } = req.params;
    const { file } = req.body;

    const cityRef = db.collection('files').doc(uid);
    await cityRef.update({
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
router.delete('/file/:uid', async (req, res) => {
    const { uid } = req.params;

    const cityRef = db.collection('files').doc(uid);
    await cityRef.delete().then(() => {
        res.status(200).send({
            message: 'File deleted successfully'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

// Find all
router.get('/files', async (req, res) => {
    const cityRef = db.collection('files').doc('SF');
    const doc = await cityRef.get();
    if (!doc.exists) {
        res.status(404).send('No such document!');
    } else {
        res.send(doc.data());
    }
});

module.exports = router;