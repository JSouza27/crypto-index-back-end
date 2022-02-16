const express = require('express');
const login = require('../router/loginRouter');
const exchange = require('../router/exchangeRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api', (_req, res) => {
  res.json({ message: 'Bem vindo a Crypto Index API!' });
});

app.use('/api', exchange);
app.use('/api', login);

module.exports = app;
