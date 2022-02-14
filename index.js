const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
  res.json('funcionando');
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

module.exports = app;
