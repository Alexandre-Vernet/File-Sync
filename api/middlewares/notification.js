const admin = require("firebase-admin");


const sendNotification = () => {
    const token = 'fabP1bHHdLBmpxIUS3ogJo:APA91bE6efeap9PDGG-cedabrnl7gUnu71yQhpg-Slgz2A9t4gbZ3Y-XKtDSFb6P8x2TflUZlaqZ-aA7ABem7lwXcbsDXVz7H5fGdGl1SJpB8c23ly6b0wJffcTHDmAZ3dnh-JZ7_WFX'
    const message = {
        notification: {
            title: 'Titre de la notification',
            body: 'Corps de la notification'
        },
        token
    };

    admin.messaging().send(message)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });

};

module.exports = { sendNotification }
