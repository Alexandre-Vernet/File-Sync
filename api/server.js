const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    })
});

const db = getFirestore();

app.use(express.json());
app.use(express.static('public'));


app.get('/', async (req, res) => {
    res.sendFile(`${ __dirname }/index.html`);
});

// Create
app.post('/file', async (req, res) => {
    const { uid, file } = req.body;

    // Generate random ID
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    await db.collection('files').doc(uid).set({
        [id]: {
            file: file,
            date: new Date()
        }
    }, { merge: true }).then(() => {
        res.status(201).send({
            message: 'File uploaded successfully'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

// Read
app.get('/file/:uid', async (req, res) => {
    const { uid } = req.params;
    const cityRef = db.collection('files').doc(uid);
    const doc = await cityRef.get();
    if (!doc.exists) {
        res.status(404).send({
            message: 'File not found'
        });
    } else {
        res.send(doc.data());
    }
});

// Update
app.put('/file/:uid', async (req, res) => {
    const { uid } = req.params;
    const { file } = req.body;

    const cityRef = db.collection('files').doc(uid);
    await cityRef.update({ file }).then(() => {
        res.status(200).send({
            message: 'File updated successfully'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

// Delete
app.delete('/file/:uid', async (req, res) => {
    const { uid } = req.params;

    const cityRef = db.collection('files').doc(uid);
    await cityRef.delete().then(() => {
        res.status(200).send({
            message: 'File deleted successfully'
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
});

// Find all
app.get('/files', async (req, res) => {
    const cityRef = db.collection('files').doc('SF');
    const doc = await cityRef.get();
    if (!doc.exists) {
        res.status(404).send('No such document!');
    } else {
        res.send(doc.data());
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${ port } !`);
});