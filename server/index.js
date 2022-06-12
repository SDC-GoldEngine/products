require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser').json();

const router = require('./routes');

const app = express();
// const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser);

app.use('/products', router);

// app.listen(port, () => console.log(
//   `Listening on http://${process.env.HOST}:${port}`,
// ));

module.exports = app;
