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
                // Get current date
                const currentDate = new Date();

                // Get file date
                const fileDate = new Date(file[fileId].date);

                // Get difference between current date and file date
                const diff = Math.abs(currentDate - fileDate);

                // Convert difference in days
                const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

                // If file is older than 7 days, delete it
                if (diffDays >= 7) {
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