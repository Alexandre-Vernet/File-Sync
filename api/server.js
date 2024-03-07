const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./router/router');
const validateEnvVariables = require("./config/validateEnvVariables");
const port = process.env.PORT;

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
    validateEnvVariables();
    console.log(`File-Sync listening on port ${port}!`)
});
