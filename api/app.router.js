const express = require('express');
const router = express.Router();
const fileRouter = require('./file/file.router');
const userRouter = require('./user/user.router');

router.get('/', async (req, res) => {
    res.sendFile(`${ __dirname }/index.html`);
});

router.use('/file', fileRouter);
router.use('/user', userRouter);

module.exports = router;
