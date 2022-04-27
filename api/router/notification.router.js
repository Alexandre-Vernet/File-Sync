const express = require('express');
const notifications = express.Router();
const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

// Create
notifications.post('/', async (req, res) => {
    const { subs, uid } = req.body;

    // Check if file already exists in the database
    const notificationRef = db.collection('notifications').doc(uid);
    const notificationSnapshot = await notificationRef.get();

    for (const dataKey in notificationSnapshot.data()) {
        const notification = notificationSnapshot.data()[dataKey];
        if (notification.endpoint === subs.endpoint) {
            return res.status(400).json({
                message: 'Notification already exists'
            });
        }
    }

    // Generate random ID
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Store subs in firestore
    await db.collection('notifications').doc(uid).set({
        [id]: subs
    }, { merge: true }).then(() => {
        res.status(201).send({
            message: 'Subscription created'
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

module.exports = notifications;