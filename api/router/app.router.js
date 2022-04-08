const express = require('express');
const router = express.Router();
const fileRouter = require('./file.router');
const userRouter = require('./user.router');


router.use('/files', ((req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }

}), fileRouter);
router.use('/users', userRouter);

module.exports = router;
