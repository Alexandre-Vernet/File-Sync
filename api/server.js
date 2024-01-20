const express = require('express');
const app = express();
const port = process.env.PORT;
require('dotenv').config();
const router = require('./router/router');
const validateEnvVariables = require("./config/validateEnvVariables");

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
    validateEnvVariables();
    console.log(`File-Sync listening on port ${port}!`)
});
