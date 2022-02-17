const express = require('express');
const controller = require('../controllers/exchangeController');
const { checkAuthorization, validateBody } = require('../middlewares/exchangeMiddleware');

const router = express.Router();

router.get('/crypto/btc', checkAuthorization, controller.getExchangeRate);
router.post('/crypto/btc', checkAuthorization, validateBody, controller.updateCurrency);

module.exports = router;
