const HttpStatus = require('../utils/httpStatus');
const service = require('../services/exchangeService');

const getExchangeRate = async (req, res) => {
  try {
    const { code, notification } = await service.getExchangeRate();
    return res.status(code).json(notification);
  } catch (e) {
    return res.status(HttpStatus.internalServerError).json({ message: e });
  }
};

const updateCurrency = async (req, res) => {
  try {
    const { code, notification } = await service.updateCurrency(req.body);
    return res.status(code).json(notification);
  } catch (e) {
    return res.status(HttpStatus.internalServerError).json({ message: e });
  }
};

module.exports = { getExchangeRate, updateCurrency };