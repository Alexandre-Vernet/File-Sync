const express = require('express');
const user = express.Router();

const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require("firebase-admin/auth");
const db = getFirestore();

// Create
user.post('/', async (req, res) => {
    const { firstName, lastName, email, photoURL } = req.body.user;

    getAuth()
        .createUser({
            firstName, lastName, email, photoURL
        })
        .then((userRecord) => {
            res.status(201).send({ userRecord })
        })
        .catch((error) => {
            res.status(500).send({ error })
        });
});

// Read
user.get('/:uid', async (req, res) => {
    const { uid } = req.params;

    getAuth()
        .getUser(uid)
        .then((userRecord) => {
            res.status(200).send({ userRecord });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
});

// Update
user.put('/:uid', async (req, res) => {
    const { uid } = req.params;
    const { firstName, lastName, email, photoURL } = req.body.user;

    getAuth()
        .updateUser(uid, { firstName, lastName, email, photoURL })
        .then((userRecord) => {
            res.status(200).send({ userRecord });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
});

// Delete
user.delete('/:uid', async (req, res) => {
    const { uid } = req.params;

    getAuth()
        .deleteUser(uid)
        .then(() => {
            res.status(200).send({
                message: 'User has been successfully deleted'
            });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
});

// Find all
user.get('/findAll', async (req, res) => {
    await db.collection('users').get().then(snapshot => {
        const users = [];

        snapshot.forEach(doc => {
            users.push({
                uid: doc.id,
                ...doc.data()
            });
        });

        res.status(200).send({
            message: users
        });
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

module.exports = user;