const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
const axios = require('axios');

app.use(express.static(__dirname + '/public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`App listening on port ${ port } !`);
});