const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const router = require('./router/app.router');
const validateEnvVariables = require("./config/validateEnvVariables");

app.use(express.json());

app.use('/api', (req, res, next) => {
    next();
}, router);

validateEnvVariables();


app.listen(port);
