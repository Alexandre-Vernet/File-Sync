const express = require('express');
const app = express();
const port = process.env.PORT || 80;
require('dotenv').config();
const router = require('./router/app.router');
const validateEnvVariables = require("./config/validateEnvVariables");
const { blockOrigin } = require("./middlewares/blockOrigin");

app.use(express.json());
app.use('/', (req, res, next) => {
    res.send('Hello World!')
    next();
});

app.use('/api', blockOrigin, router);

validateEnvVariables();


app.listen(port, () => console.log(`File-Sync listening on port ${port}!`));
