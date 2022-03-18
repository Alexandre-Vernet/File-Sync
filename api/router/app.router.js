const express = require('express');
const router = express.Router();
const mediaRouter = require('./media.router');
const userRouter = require('./user.router');

router.get('/', async (req, res) => {
    res.sendFile(`${ __dirname }/index.html`);
});

router.use('/medias', mediaRouter);
router.use('/users', userRouter);

module.exports = router;
