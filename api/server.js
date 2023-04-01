const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const router = require('./router/app.router');
const validateEnvVariables = require("./config/validateEnvVariables");

app.use(express.json());

app.use('/api', (req, res, next) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
    res.setHeader('Access-Control-Allow-Origin', frontendUrl);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}, router);

validateEnvVariables();


app.listen(port);
