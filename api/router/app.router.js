const express = require('express');
const router = express.Router();
const fileRouter = require('./file.router');
const userRouter = require('./user.router');
const cors = require('cors');
const { verifyAccessToken } = require("../middlewares/jwt");

const authorizedOrigin = process.env.AUTHORIZED_ORIGIN || 'http://localhost:4200';

router.use(cors({
    origin: authorizedOrigin
}));

router.use('/files', verifyAccessToken, ((req, res, next) => {
    next();
}), fileRouter);

router.use('/users', userRouter);

router.use('.well-known/assetlinks.json', express.static('files/assetlinks.json'));

module.exports = router;
