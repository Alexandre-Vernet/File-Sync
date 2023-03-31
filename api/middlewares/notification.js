const admin = require("firebase-admin");


const sendNotification = (token) => {
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
