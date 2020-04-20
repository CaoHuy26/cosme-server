const authRouter = require('express').Router();
const login = require('./login');
const register = require('./register');

const { loginValidate, loginValidationRules } = require('../../middlewares/validators/loginValidation');
const { registerValidate, registerValidationRules } = require('../../middlewares/validators/registerValidation');

authRouter.post('/login', loginValidationRules(), loginValidate, login);

authRouter.post('/register', registerValidationRules(), registerValidate, register);

module.exports = authRouter;
