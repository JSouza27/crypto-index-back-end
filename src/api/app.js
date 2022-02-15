const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
  res.json('funcionando');
});

module.exports = app;
