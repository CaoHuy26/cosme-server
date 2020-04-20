const { body, validationResult } = require('express-validator');

const loginValidationRules = () => {
  return [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is invalid'),
    body('password')
      .notEmpty().withMessage('Password is required')
  ];
};

const loginValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // .status(422)
  return res.json({ 
    statusCode: 422,
    success: false,
    msg: 'Login fail',
    errors: errors.array()
  });
};

module.exports = {
  loginValidationRules,
  loginValidate
};