const express = require('express');
const controller = require('../controllers/loginController');
const { validateLogin } = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/login', validateLogin, controller.loginUser);

module.exports = router;
