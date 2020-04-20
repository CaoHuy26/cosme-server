const { body, validationResult } = require('express-validator');

const registerValidationRules = () => {
  return [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is invalid'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  ];
};

const registerValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // .status(422)
  return res.json({ 
    statusCode: 422,
    success: false,
    msg: 'Register fail',
    errors: errors.array()
  });
};

module.exports = {
  registerValidationRules,
  registerValidate
};