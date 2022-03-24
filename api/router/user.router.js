const express = require('express');
const user = express.Router();

const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();


// Create
user.post('/', async (req, res) => {
    const { displayName, email, password } = req.body.user;

    getAuth()
        .createUser({ displayName, email, password })
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

            getAuth()
                .createCustomToken(uid)
                .then((token) => {
                    // Send token back to client
                    res.status(200).send({ userRecord, token });
                })
                .catch((error) => {
                    console.log('Error creating custom token:', error);
                });
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

    // Delete user
    getAuth()
        .deleteUser(uid)
        .then(async () => {
            // Delete files of user
            db.collection('files').doc(uid).delete().then(() => {
                res.status(200).send({
                    message: 'User has been successfully deleted'
                });
            }).catch((error) => {
                res.status(500).send({
                    error
                });
            });

        })
        .catch((error) => {
            res.status(500).send({ error });
        });
});

// Find all
user.get('/list/findAll', async (req, res) => {
    const listAllUsers = (nextPageToken) => {
        const users = [];
        getAuth()
            .listUsers(1000, nextPageToken)
            .then((listUsersResult) => {
                listUsersResult.users.forEach((userRecord) => {
                    users.push(userRecord);
                });
                if (listUsersResult.pageToken) {
                    listAllUsers(listUsersResult.pageToken);
                }
                res.status(200).send({ users });
            })
            .catch((error) => {
                res.status(500).send({ error });
            });
    };
    listAllUsers();
});

module.exports = user;