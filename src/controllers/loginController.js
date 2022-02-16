const HttpStatus = require('../utils/httpStatus');
const service = require('../services/loginService');

const loginUser = async (req, res) => {
  try {
    const { code, notification } = service.loginUser();
    return res.status(code).json(notification);
  } catch (e) {
    return res.status(HttpStatus.internalServerError).json({ message: e });
  }
};

module.exports = {
  loginUser,
};
