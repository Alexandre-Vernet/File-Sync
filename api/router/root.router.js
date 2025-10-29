const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send("File-Sync API is running");
});

module.exports = router;
