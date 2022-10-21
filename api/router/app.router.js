const express = require('express');
const router = express.Router();
const fileRouter = require('./file.router');
const userRouter = require('./user.router');
const verifyToken = require('../middlewares/jwt');

router.use('/files', verifyToken, ((req, res, next) => {
    next();
}), fileRouter);

router.use('/users', userRouter);

router.use('.well-known/assetlinks.json', express.static('files/assetlinks.json'));


module.exports = router;
