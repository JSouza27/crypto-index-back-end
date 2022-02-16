const express = require('express');
const controller = require('../controllers/loginController');
const { isExist, validEmail, validPassword } = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/login', isExist, validEmail, validPassword, controller.loginUser);

module.exports = router;
