const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
require('dotenv').config();
const router = require('./app.router');


app.use(express.json());
app.use(express.static('public'));

app.use('/api', router);

app.listen(port, () => {
    console.log(`App listening on port ${ port } !`);
});