const express = require('express');
const controller = require('../controllers/exchangeController');
const { checkAuthorization, validateBody } = require('../middlewares/exchangeMiddleware');

const router = express.Router();

router.use('/cryto/btc', checkAuthorization, validateBody)
      .get(controller.getExchangeRate)
      .post(controller.updateCurrency);

module.exports = router;
