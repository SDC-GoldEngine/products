require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser').json();

const router = require('./routes');

const app = express();
// const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser);

app.use('', router);

// COMMENT OUT FOR JEST TEST; entry on index.js
// app.listen(port, () => console.log(
//   `Listening on http://${process.env.HOST}:${port}`,
// ));

module.exports = app;
