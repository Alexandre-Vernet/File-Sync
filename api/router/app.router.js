const express = require('express');
const router = express.Router();
const fileRouter = require('./file.router');
const userRouter = require('./user.router');
const notificationRouter = require('./notification.router');
const cors = require('cors');
const { verifyAccessToken } = require("../middlewares/jwt");

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
    router.use(cors({
        origin: 'http://localhost:4200'
    }));
}

router.use('/files', verifyAccessToken, ((req, res, next) => {
    next();
}), fileRouter);

router.use('/notifications', verifyAccessToken, ((req, res, next) => {
    next();
}), notificationRouter);

router.use('/users', userRouter);

router.use('.well-known/assetlinks.json', express.static('files/assetlinks.json'));


module.exports = router;
