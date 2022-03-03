const express = require('express');
const router = express.Router();
const fileRouter = require('./file/file.router');
const userRouter = require('./user/user.router');

router.get('/', async (req, res) => {
    res.sendFile(`${ __dirname }/index.html`);
});

router.use('/files', fileRouter);
router.use('/users', userRouter);

module.exports = router;
