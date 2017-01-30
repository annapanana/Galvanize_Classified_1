'use strict';

const express = require('express');
const app = express();
const messages = require('./routes/classifieds');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended:false
}));

app.use(bodyParser.json());
app.use(express.static('./public'));
app.use('/classifieds',messages);

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  console.log("Hello World");
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
