const HttpStatus = require('../utils/httpStatus');

const checkEmail = /^[a-z0-9.]+@[a-z]+\.([a-z]+)?$/i;
const checkPassword = /[^0-9.]/;
const errorMessage = { message: 'Campos inválidos' };

const isExist = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(HttpStatus.badRequest).json(errorMessage);
  }

  next();
};

const validEmail = (req, res, next) => {
  const { email } = req.body;

  if (!checkEmail.test(email)) {
    return res.status(HttpStatus.badRequest).json(errorMessage);
  }

  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;

  if (checkPassword.test(password) || password.toString().length !== 6) {
    return res.status(HttpStatus.badRequest).json(errorMessage);
  }

  next();
};

module.exports = { isExist, validEmail, validPassword };
