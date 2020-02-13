const { body, validationResult } = require('express-validator');

const userValidationLoginRules = () => {
  return [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is invalid'),
    body('password')
      .notEmpty().withMessage('Password is required')
  ];
};

const userValidationRegisterRules = () => {
  return [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is invalid'),
    body('password')
      .isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ 
    statusCode: 422,
    success: false,
    message: 'Login fail',
    errors: errors.array()
  });
};

module.exports = {
  userValidationLoginRules,
  userValidationRegisterRules,
  validate
};