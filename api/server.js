const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const router = require('./router/app.router');


app.use(express.json());
app.use(express.static('public'));

app.use('/api', router);


app.listen(port);