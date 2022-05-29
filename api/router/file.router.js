const express = require('express');
const file = express.Router();
const FieldValue = require('firebase-admin').firestore.FieldValue
const { getFirestore } = require('firebase-admin/firestore');
const admin = require("firebase-admin");
const webPush = require("web-push");
const { calculateTotalUserFilesSize, ifFileExists, checkFileSize } = require("../file");

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    }), storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = getFirestore();

const publicVapidKey = 'BIpTNnuLGI0cH7M-vUW4mN8Zt0hUTIliAElwR9onUDO-EYPOdhlKs_p7d6dyfjqh2TvIibfYP94mpsinjZiBbBU'
const privateVapidKey = 'x_0AVkivQdmieoPLgPT3-eAZG7I-_QMWvJ7-uJ6Fipw';
webPush.setVapidDetails(`mailto:${ process.env.MAIL_EMAIL }`, publicVapidKey, privateVapidKey);


// Create
file.post('/', checkFileSize, ifFileExists, calculateTotalUserFilesSize, async (req, res) => {
    const { uid, file, pushSubscriptionLocalStorage } = req.body;

    // Generate random ID
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    await db.collection('files').doc(uid).set({
        [id]: file
    }, { merge: true }).then(async () => {

        if (pushSubscriptionLocalStorage) {

            // Create notification
            const payLoad = {
                'notification': {
                    'title': 'File-Sync',
                    'body': `New file added ! \n${ file.name }`,
                    'icon': 'https://raw.githubusercontent.com/Alexandre-Vernet/File-Sync/main/front/src/assets/icons/app_icon/icon.png',
                    'vibrate': [100, 50, 100],
                }
            };

            const notificationRef = db.collection('notifications').doc(uid);
            const notificationSnapshot = await notificationRef.get();

            // Send notification to all subs of user except the one who sent the file
            for (const dataKey in notificationSnapshot.data()) {
                const pushSubscription = notificationSnapshot.data()[dataKey];
                if (pushSubscription.endpoint !== pushSubscriptionLocalStorage.endpoint) {
                    try {
                        webPush.sendNotification(pushSubscription, JSON.stringify(payLoad));
                    } catch (e) {
                        return res.status(400).json({
                            message: 'Error while sending notification'
                        });
                    }
                }
            }
        }

        return res.status(201).json({
            message: 'File uploaded successfully'
        });
    });
});

// Update
file.put('/:uid/:fileId', async (req, res) => {
    const { uid, fileId } = req.params;
    const { file } = req.body;

    // Get name of file with fileId
    const fileRef = db.collection('files').doc(uid);
    const files = (await fileRef.get()).data();
    const oldName = files[fileId].name;

    if (files) {

        if (file.url) {
            // Rename in storage
            await admin.storage()
                .bucket()
                .file(`files/${ oldName }`)
                .rename(`files/${ file.name }`)
                .then(async () => {
                    // Expires in 1 week
                    const expiresInOneWeek = new Date();
                    expiresInOneWeek.setDate(expiresInOneWeek.getDate() + 7);

                    // Get new URL
                    const newUrl = await admin.storage()
                        .bucket()
                        .file(`files/${ file.name }`)
                        .getSignedUrl({
                            action: 'read', expires: expiresInOneWeek
                        });

                    // Rename in firestore
                    await fileRef.update({
                        [fileId]: {
                            name: file.name,
                            type: file.type,
                            date: file.date,
                            size: file.size,
                            url: newUrl[0]
                        }
                    })
                        .then(() => {
                            res.status(200).send({
                                message: 'File updated successfully'
                            })
                        })
                        .catch(error => {
                            res.status(500).send({
                                message: error.message
                            });
                        })
                })
                .catch(error => {
                    res.status(500).send({
                        message: error.message
                    });
                });
        } else {

            // Rename in firestore
            await fileRef.update({
                [fileId]: {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    date: file.date,
                }
            })
                .then(() => {
                    res.status(200).send({
                        message: 'File updated successfully'
                    })
                })
                .catch(error => {
                    res.status(500).send({
                        message: error.message
                    });
                });
        }
    } else {
        res.status(404).send({
            message: 'File not found'
        });
    }
});

// Delete
file.delete('/:uid/:fileId', async (req, res) => {
    const { uid, fileId } = req.params;

    const fileRef = db.collection('files').doc(uid);

    // Get filename
    const fileSnapshot = await fileRef.get();
    const file = fileSnapshot.data()[fileId];

    // If file exists
    if (file) {
        // Delete file from firestore
        await fileRef.update({
            [fileId]: FieldValue.delete()
        }).then(async () => {
            if (file.url) {
                // Delete file from storage
                await admin.storage().bucket()
                    .file(`files/${ file.name }`)
                    .delete()
                    .then(() => {
                        res.status(200).send({
                            message: 'File deleted successfully'
                        })
                    }).catch(error => {
                        res.status(500).send({
                            message: error.message
                        });
                    })
            } else {
                res.status(200).send({
                    message: 'File deleted successfully'
                })
            }
        })
    } else {
        res.status(404).send({
            message: 'File not found'
        });
    }
});

// Delete all
file.post('/deleteAll', async (req, res) => {
    const { uid } = req.body;

    // Get all files name from firestore
    const fileSnapshot = await db.collection('files').doc(uid).get();
    const files = fileSnapshot.data();

    // Get files id
    for (const fileId in files) {
        const file = files[fileId];

        // Delete all files from storage
        admin.storage().bucket()
            .file(`files/${ file.name }`)
            .delete()
            .catch(error => {
                return res.status(500).send({
                    message: error.message
                });
            })
    }

    // Delete all files from firestore
    db.collection('files')
        .doc(uid)
        .delete()
        .then(() => {
            res.status(200).send({
                message: 'All files deleted successfully'
            })
        }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    })
});

module.exports = file;
