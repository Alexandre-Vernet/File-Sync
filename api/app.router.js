const express = require('express');
const router = express.Router();
const fileRouter = require('./file/file.router');

router.get('/', async (req, res) => {
    res.sendFile(`${ __dirname }/index.html`);
});

router.use('/file', fileRouter);

module.exports = router;
