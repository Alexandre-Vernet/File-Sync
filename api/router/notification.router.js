const express = require('express');
const notification = express.Router();

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

notification.post('/', (req, res) => {
    const { uid, token } = req.body

    const notificationRef = db.collection('notifications').doc(uid);

    notificationRef.set({
        token
    }, { merge: true })
        .then(() => {
            res.status(201).send({
                message: 'Token saved successfully'
            });
        })
        .catch(error => {
            res.status(500).send({
                message: error.message
            });
        })
});

module.exports = notification;
