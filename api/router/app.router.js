const express = require('express');
const router = express.Router();
const fileRouter = require('./file.router');
const userRouter = require('./user.router');

router.use('/files', fileRouter);
router.use('/users', userRouter);

module.exports = router;
