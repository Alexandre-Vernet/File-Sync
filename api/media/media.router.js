const express = require('express');
const media = express.Router();
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
media.post('/', async (req, res) => {
    const { uid, media } = req.body;

    // Generate random ID
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    await db.collection('medias').doc(uid).set({
        [id]: media
    }, { merge: true }).then(() => {
        res.status(201).send({
            message: 'Media uploaded successfully'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

// Read
media.get('/:uid/:mediaId', async (req, res) => {
    const { uid, mediaId } = req.params;

    // Get all medias
    const mediaRef = db.collection('medias').doc(uid);
    const medias = (await mediaRef.get()).data();

    // Find mediaId
    const media = medias[mediaId];

    res.send({ media });
});

// Update
media.put('/:uid/:mediaId', async (req, res) => {
    const { uid, mediaId } = req.params;
    const { media } = req.body;

    const mediaRef = db.collection('medias').doc(uid);
    await mediaRef.update({
        [mediaId]: {
            name: media,
            date: new Date()
        }
    }).then(() => {
        res.status(200).send({
            message: 'Media updated successfully'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

// Delete
media.delete('/:uid/:mediaId', async (req, res) => {
    const { uid, mediaId } = req.params;

    const mediaRef = db.collection('medias').doc(uid);

    await mediaRef.update({
        [mediaId]: FieldValue.delete()
    }).then(() => {
        res.status(200).send({
            message: 'Media deleted successfully'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

// Find all
media.get('/:uid', async (req, res) => {
    const { uid } = req.params;

    const mediaRef = db.collection('medias').doc(uid);
    const doc = await mediaRef.get();
    if (!doc.exists) {
        res.status(404).send({
            message: 'No medias found'
        });
    } else {
        const mediasId = Object.keys(doc.data());
        const medias = [];
        mediasId.forEach(id => {
            medias.push(doc.data()[id]);
            medias[medias.length - 1].id = id;
        });
        res.send(medias);
    }
});

module.exports = media;