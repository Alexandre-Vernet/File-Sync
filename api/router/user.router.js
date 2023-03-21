const express = require('express');
const users = express.Router();

const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
const { checkUserFormat } = require("../middlewares/user");
const {
    verifyRefreshToken,
    verifyAccessToken,
    decodeAccessToken,
    getAccessToken,
    getRefreshToken,
    getAccessTokenFromRefreshToken
} = require("../middlewares/jwt");

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
            const accessToken = getAccessToken(userRecord);
            const refreshToken = getRefreshToken(userRecord);
            res.status(200).send({ accessToken, refreshToken });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
});

// Sign in with access token
users.post('/sign-in-with-access-token', async (req, res) => {
    const { accessToken } = req.body;
    decodeAccessToken(accessToken)
        .then(decoded => {
            const user = decoded.payload;
            res.status(200).send(user)
        })
        .catch((error) => {
            res.status(500).send({ error })
        });
});

// Get an access token from a refresh token
users.post('/refresh-token', verifyRefreshToken, (req, res) => {
    const { refreshToken } = req.body;

    const accessToken = getAccessTokenFromRefreshToken(refreshToken);
    res.status(200).send({ accessToken });
});

// Update
users.put('/:uid', verifyAccessToken, async (req, res) => {
    const { uid } = req.params;
    const { user } = req.body;
    const { displayName, email, password } = user;

    getAuth()
        .updateUser(uid, { displayName, email, password })
        .then(() => {
            res.status(200);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// Delete
users.delete('/:uid', verifyAccessToken, async (req, res) => {
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
