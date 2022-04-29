const express = require('express');
const router = express.Router();
const fileRouter = require('./file.router');
const userRouter = require('./user.router');
const notificationRouter = require('./notification.router');
const jwt = require('jsonwebtoken');

router.use('/files', verifyToken, ((req, res, next) => {
    const token = req.token;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(token, accessTokenSecret, (err) => {
        if (err) {
            res.sendStatus(403);
        } else {
            next();
        }
    });
}), fileRouter);

router.use('/users', userRouter);
router.use('/notifications', notificationRouter);

router.use('.well-known/assetlinks.json', express.static('files/assetlinks.json'));

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')[1];
        req.token = bearer;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;
