const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`App listening on port ${ port } !`);
});