const express = require('express');
const router = express.Router();
const fileRouter = require('./file.router');
const userRouter = require('./user.router');
const { verifyToken } = require('../middlewares/jwt');
const cors = require('cors');

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
    router.use(cors({
        origin: 'http://localhost:4200'
    }));
}

router.use('/files', verifyToken, ((req, res, next) => {
    next();
}), fileRouter);

router.use('/users', userRouter);

router.use('.well-known/assetlinks.json', express.static('files/assetlinks.json'));


module.exports = router;
