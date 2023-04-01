const express = require('express');
const router = express.Router();
const fileRouter = require('./file.router');
const userRouter = require('./user.router');
const { verifyAccessToken } = require("../middlewares/jwt");


router.use('/files', verifyAccessToken, ((req, res, next) => {
    next();
}), fileRouter);

router.use('/users', userRouter);

router.use('.well-known/assetlinks.json', express.static('files/assetlinks.json'));


module.exports = router;
