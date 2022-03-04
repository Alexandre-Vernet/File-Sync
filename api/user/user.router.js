const express = require('express');
const user = express.Router();

const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

// Create
user.post('/', async (req, res) => {
    const { uid, firstName, lastName, email, photoURL, dateCreation } = req.body.user;

    await db.collection('users').doc(uid).set({
        firstName, lastName, email, photoURL, dateCreation
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

// Read
user.get('/:uid', async (req, res) => {
    const { uid } = req.params;

    await db.collection('users').doc(uid).get().then(doc => {
        if (doc.exists) {
            res.status(200).send({
                user: doc.data()
            });
        } else {
            res.status(404).send({
                message: 'User not found'
            });
        }
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

// Update
user.put('/:uid', async (req, res) => {
    const { uid } = req.params;
    const { firstName, lastName, email, photoURL, dateCreation } = req.body;

    await db.collection('users').doc(uid).update({
        firstName, lastName, email, photoURL, dateCreation
    }).then(() => {
        res.status(200).send({
            message: 'User has been successfully updated'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

// Delete
user.delete('/:uid', async (req, res) => {
    const { uid } = req.params;

    await db.collection('users').doc(uid).delete().then(() => {
        res.status(200).send({
            message: 'User has been successfully deleted'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
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