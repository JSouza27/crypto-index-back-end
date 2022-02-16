const express = require('express');
const controller = require('../controllers/exchangeController');
const { checkAuthorization, validateBody } = require('../middlewares/exchangeMiddleware');

const router = express.Router();

router.get('/cryto/btc', checkAuthorization, validateBody, controller.getExchangeRate);
router.post('/cryto/btc', checkAuthorization, controller.updateCurrency);

module.exports = router;
