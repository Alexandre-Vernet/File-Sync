const express = require('express');
const router = express.Router();
const fileRouter = require('./file.router');
const userRouter = require('./user.router');
const cors = require('cors');
const { verifyAccessToken } = require("../middlewares/jwt");

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';

router.use(cors({
    origin: frontendUrl
}));

router.use('/files', verifyAccessToken, ((req, res, next) => {
    next();
}), fileRouter);

router.use('/users', userRouter);

router.use('.well-known/assetlinks.json', express.static('files/assetlinks.json'));


module.exports = router;
