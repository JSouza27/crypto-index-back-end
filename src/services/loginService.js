const crypto = require('crypto');
const HttpStatus = require('../utils/httpStatus');
require('dotenv').config();

const loginUser = () => {
  const secret = process.env.SECRET;
  const token = crypto.createHash('md5').update(secret).digest('hex');

  return {
    code: HttpStatus.ok,
    notification: { token: token.slice(0, 16) },
  };
};

module.exports = { loginUser };
