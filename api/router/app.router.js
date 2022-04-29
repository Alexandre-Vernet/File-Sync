const express = require('express');
const router = express.Router();
const fileRouter = require('./file.router');
const userRouter = require('./user.router');
const notificationRouter = require('./notification.router');
const jwt = require('jsonwebtoken');
const verifyToken = require('../jwt');
const { getAuth } = require("firebase-admin/auth");

router.use('/files', ((req, res, next) => {
    const token = req.headers.authorization;
    const bearer = token.split(' ')[1];

    getAuth()
        .verifyIdToken(bearer)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(401).send({
                message: 'Unauthorized'
            });
        });
}), fileRouter);

router.use('/users', userRouter);

router.use('/notifications', verifyToken, ((req, res, next) => {
    const token = req.token;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(token, accessTokenSecret, (err) => {
        if (err) {
            res.sendStatus(403);
        } else {
            next();
        }
    })
}), notificationRouter);

router.use('.well-known/assetlinks.json', express.static('files/assetlinks.json'));


module.exports = router;
