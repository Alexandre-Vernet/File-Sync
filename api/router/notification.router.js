const express = require('express');
const notification = express.Router();
const { getFirestore } = require('firebase-admin/firestore');

const admin = require("firebase-admin");

const webPush = require('web-push');
const publicVapidKey = 'BIpTNnuLGI0cH7M-vUW4mN8Zt0hUTIliAElwR9onUDO-EYPOdhlKs_p7d6dyfjqh2TvIibfYP94mpsinjZiBbBU'
const privateVapidKey = 'x_0AVkivQdmieoPLgPT3-eAZG7I-_QMWvJ7-uJ6Fipw';
webPush.setVapidDetails('mailto:alexandre.vernet@g-mail.fr', publicVapidKey, privateVapidKey);


const db = getFirestore();

// Create
notification.post('/', async (req, res) => {
    const { sub } = req.body;
    console.log('notification');

    // Create notification
    const payLoad = {
        "notification": {
            "title": "File-Sync",
            "body": "New file added !",
            "icon": "https://raw.githubusercontent.com/Alexandre-Vernet/File-Sync/main/front/src/assets/icons/app_icon/icon.png",
            "vibrate": [100, 50, 100],
        }
    };

    webPush.sendNotification(sub, JSON.stringify(payLoad))
        .then(() => {
            res.status(200).json({
                message: "Notification sent"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
});

module.exports = notification;