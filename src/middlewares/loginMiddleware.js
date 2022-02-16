const HttpStatus = require('../utils/httpStatus');

const checkEmail = /^[a-z0-9.]+@[a-z]+\.([a-z]+)?$/i;
const checkPassword = /[^0-9.]/;

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (checkPassword.test(password) || password.toString().length !== 6) {
    return res.status(HttpStatus.badRequest).json({ message: 'Campos inválidos' });
  }

  if (!checkEmail.test(email)) {
    return res.status(HttpStatus.badRequest).json({ message: 'Campos inválidos' });
  }

  next();
};

module.exports = { validateLogin };
