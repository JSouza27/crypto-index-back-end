const { currenciesKeys } = require('../utils/currenciesAux');
const HttpStatus = require('../utils/httpStatus');

const checkAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined || authorization.length < 16) {
    return res.status(HttpStatus.unauthorized).json({ message: 'Token inválido' });
  }

  next();
};

const validateBody = async (req, res, next) => {
  const { currency, value } = req.body;

  const keys = await currenciesKeys();
  const checkCurrency = keys.some((key) => key === currency);

  if (!checkCurrency) {
    return res.status(HttpStatus.badRequest).json({ message: 'Moeda inválida' });
  }

  if (value <= 0 || !Number.isInteger(value)) {
    return res.status(HttpStatus.badRequest).json({ message: 'Valor inválido' });
  }

  next();
};

module.exports = { validateBody, checkAuthorization };
