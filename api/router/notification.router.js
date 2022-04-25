const express = require('express');
const notification = express.Router();
const { getFirestore } = require('firebase-admin/firestore');

const admin = require("firebase-admin");

const webpush = require('web-push');
const publicVapidKey = 'BIpTNnuLGI0cH7M-vUW4mN8Zt0hUTIliAElwR9onUDO-EYPOdhlKs_p7d6dyfjqh2TvIibfYP94mpsinjZiBbBU'
const privateVapidKey = 'x_0AVkivQdmieoPLgPT3-eAZG7I-_QMWvJ7-uJ6Fipw';
webpush.setVapidDetails('mailto:alexandre.vernet@g-mail.fr', publicVapidKey, privateVapidKey);



const db = getFirestore();

// Create
notification.post('/', async (req, res) => {

});

// Read
notification.get('/:uid/:fileId', async (req, res) => {

});

// Delete
notification.delete('/:uid/:fileId', async (req, res) => {

});

module.exports = notification;