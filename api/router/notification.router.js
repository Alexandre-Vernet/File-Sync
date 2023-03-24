const express = require('express');
const notification = express.Router();

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

notification.post('/', async (req, res) => {
    const { uid, token } = req.body

    const fileRef = db.collection('files').doc(uid);

    fileRef.update({
        [uid]: {
            token
        }
    })
        .then(() => {
            res.status(200).send({
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
