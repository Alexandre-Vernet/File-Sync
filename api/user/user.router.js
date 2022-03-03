const express = require('express');
const user = express.Router();

const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

// Create a new user
user.post('/', async (req, res) => {
    const { uid, firstName, lastName, email, profilePicture, dateCreation } = req.body;

    await db.collection('users').doc(uid).set({
        firstName, lastName, email, profilePicture, dateCreation
    }).then(() => {
        res.status(201).send({
            message: 'User has been successfully created'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

module.exports = user;