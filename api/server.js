const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();
require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    })
});


app.get('/', async (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`App listening on port ${ port } !`);
});