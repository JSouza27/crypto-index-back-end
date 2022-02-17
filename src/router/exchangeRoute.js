const express = require('express');
const controller = require('../controllers/exchangeController');
const { checkAuthorization, validateBody } = require('../middlewares/exchangeMiddleware');

const router = express.Router();

router.get('/cryto/btc', checkAuthorization, controller.getExchangeRate);
router.post('/cryto/btc', checkAuthorization, validateBody, controller.updateCurrency);

module.exports = router;
