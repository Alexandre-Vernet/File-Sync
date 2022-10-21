const express = require('express');
const user = express.Router();

const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
const verifyToken = require('../middlewares/jwt');
const { checkUserFormat, sendCustomVerificationEmail } = require("../middlewares/user");

// Create
user.post('/', checkUserFormat, async (req, res) => {
    const { displayName, email, password } = req.body.user;

    // Check if user already exists
    getAuth()
        .getUserByEmail(email)
        .then(() => {
            return res.status(400).send({
                message: 'This email is already in use'
            });
        }).catch(() => {
        getAuth()
            .createUser({ displayName, email, password })
            .then((userRecord) => {
                res.status(201).send({ userRecord })
            })
            .catch((error) => {
                res.status(500).send({ error })
            });
    })
});

// Sign-in
user.get('/:uid', async (req, res) => {
    const { uid } = req.params;

    getAuth()
        .getUser(uid)
        .then((userRecord) => {
            getAuth()
                .createCustomToken(uid)
                .then((customToken) => {
                    res.status(200).send({ user: userRecord, customToken })
                })
                .catch((error) => {
                    res.status(500).send({ error })
                });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
});

// Verify email
user.post('/verify-email', async (req, res) => {
    const { user } = req.body;

    getAuth()
        .generateEmailVerificationLink(user.email)
        .then((link) => {
            sendCustomVerificationEmail(user.email, user.displayName, link)
                .then(() => {
                    res.status(200).send({ message: 'Verification email sent' });
                }).catch((error) => {
                res.status(500).send({ error });
            });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
});


// Update
user.put('/:uid', verifyToken, async (req, res) => {
    const { uid } = req.params;
    const { user } = req.body;
    const { displayName, email, password } = user;

    getAuth()
        .updateUser(uid, { displayName, email, password })
        .then((userRecord) => {
            res.status(200).send({ user: userRecord });
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// Delete
user.delete('/:uid', verifyToken, async (req, res) => {
    const { uid } = req.params;

    // Delete user
    getAuth()
        .deleteUser(uid)
        .then(async () => {
            // Delete files of user
            db.collection('files')
                .doc(uid)
                .delete()
                .then(() => {
                    db.collection('notifications')
                        .doc(uid)
                        .delete()
                        .then(() => {
                            res.status(200).send({
                                message: 'User has been successfully deleted'
                            });
                        })
                        .catch((error) => {
                            res.status(500).send({
                                error
                            });
                        });
                })
                .catch((error) => {
                    res.status(500).send({
                        error
                    });
                });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
});

module.exports = user;
