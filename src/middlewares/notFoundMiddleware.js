const HttpStatus = require('../utils/httpStatus');

const nonExistentRoute = (_req, res, next) => {
  res.status(HttpStatus.notFound).json({ message: 'Endpoint não encontrado' });

  next();
};

module.exports = { nonExistentRoute };
