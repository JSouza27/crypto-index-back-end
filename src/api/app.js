const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../utils/swagger.json');
const login = require('../router/loginRouter');
const exchange = require('../router/exchangeRoute');
const { nonExistentRoute } = require('../middlewares/notFoundMiddleware');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api', (_req, res) => {
  res.json({ message: 'Bem vindo a Crypto Index API!' });
});

app.use('/api', login);
app.use('/api', exchange);
app.use(nonExistentRoute);

module.exports = app;
