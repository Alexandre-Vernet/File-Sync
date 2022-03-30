const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const router = require('./router/app.router');
const FieldValue = require('firebase-admin').firestore.FieldValue
const { getFirestore } = require("firebase-admin/firestore");


app.use(express.json());
app.use(express.static('public'));

app.use('/api', router);


const db = getFirestore();


app.listen(port, async () => {
    // Get all files
    const filesRef = db.collection('files');
    const users = await filesRef.get();
    const files = users.docs.map(doc => doc.data());

    users.forEach(user => {
        files.forEach((file) => {
            const filesId = Object.keys(file);

            filesId.forEach(async (fileId) => {
                // if File is older than 1 week
                const olderThanOneWeek = 604800000;
                if (file[fileId].date < new Date(Date.now() - olderThanOneWeek)) {
                    // Delete file
                    const fileRef = db.collection('files').doc(user.id);

                    await fileRef.update({
                        [fileId]: FieldValue.delete()
                    });
                }
            });
        });
    });
});

// app.listen(port);