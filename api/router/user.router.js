const express = require('express');
const users = express.Router();

const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
const { checkUserFormat, checkIfUserExists } = require("../middlewares/user");
const {
    verifyAccessToken,
    decodeAccessToken,
    getAccessToken,
} = require("../middlewares/jwt");

// Create
users.post('/', checkUserFormat, checkIfUserExists, async (req, res) => {
    const { displayName, email, password } = req.body.user;

    getAuth()
        .createUser({ displayName, email, password })
        .then((userRecord) => {
            res.status(201).json({ userRecord })
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        });
});

// Sign-in
users.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const userRecord = await getAuth().getUser(id);
        const accessToken = getAccessToken(userRecord);
        res.status(200).json(accessToken);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Sign in with access token
users.post('/sign-in-with-access-token', async (req, res) => {
    const { accessToken } = req.body;

    try {
        const decodedAccessToken = await decodeAccessToken(accessToken);
        const user = decodedAccessToken.payload;
        await getAuth().getUser(user.uid);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid access token'
        });
    }
});

// Update
users.put('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    const { displayName, email } = user;

    try {
        const user = await getAuth().updateUser(id, { displayName, email });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Delete
users.delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;

    try {
        // Delete user
        await getAuth().deleteUser(id);

        // Delete user's files
        await db.collection('files').doc(id).delete();
        res.status(200).json({
            message: 'User has been successfully deleted'
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = users;
