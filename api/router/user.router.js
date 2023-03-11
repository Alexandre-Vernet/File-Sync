const express = require('express');
const users = express.Router();

const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
const { checkUserFormat } = require("../middlewares/user");
const { signToken, verifyToken, decodeToken } = require("../middlewares/jwt");

// Create
users.post('/', checkUserFormat, async (req, res) => {
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
users.get('/:uid', async (req, res) => {
    const { uid } = req.params;

    getAuth()
        .getUser(uid)
        .then((userRecord) => {
            signToken(userRecord)
                .then((token) => {
                    res.status(200).send({ token })
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).send({ error })
                });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
});

// Sign in with token
users.post('/token', async (req, res) => {
    const { token } = req.body;
    decodeToken(token)
        .then((decoded) => {
            const user = decoded.payload;
            res.status(200).send(user)
        })
        .catch((error) => {
            res.status(500).send({ error })
        });
});


// Update
users.put('/:uid', verifyToken, async (req, res) => {
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
users.delete('/:uid', verifyToken, async (req, res) => {
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
            res.status(500).send({ error });
        });
});

module.exports = users;
