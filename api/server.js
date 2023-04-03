const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const router = require('./router/app.router');
const validateEnvVariables = require("./config/validateEnvVariables");

app.use(express.json());

app.use('/api', (req, res, next) => {
    const { NODE_ENV, FRONTEND_URL } = process.env;
    const origin = req.get('origin');

    if (FRONTEND_URL === origin) {
        next();
    } else {
        if (NODE_ENV === 'development') {
            next();
            return;
        }
        console.error('Forbidden request from: ' + origin);
        res.status(403).send('Forbidden');
    }
}, router);

validateEnvVariables();


app.listen(port);
