const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const router = require('./router/app.router');

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    perMessageDeflate: false,
    cors: {
        origins: ['http://localhost:4200', 'https://test-file-sync.herokuapp.com/']
    }
});


app.use(express.json());
app.use(express.static('public'));


app.get('/', async (req, res) => {
    res.sendFile(`${ __dirname }/index.html`);
});


app.use('/api', (req, res, next) => {
    req.io = io;
    next();
}, router);


http.listen(port);