const authRouter = require('express').Router();
const login = require('./login');
const register = require('./register');

const { 
  userValidationLoginRules,
  userValidationRegisterRules,
  validate 
} = require('../../middlewares/validator');

authRouter.post('/login', userValidationLoginRules(), validate, login);

authRouter.post('/register', userValidationRegisterRules(), validate, register);

module.exports = authRouter;
