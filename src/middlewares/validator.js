const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const userValidationLoginRules = () => {
  return [
    body('email')
      .notEmpty().withMessage('Email is required')
      .custom(async (value) => {
        const user = await User.findOne({
          where: {
            email: value
          }
        });
        if (!user) {
          throw new Error(`${value} is not exist`);
        }
      }),
    body('password')
      .notEmpty().withMessage('Password is required')
      .custom(async (value, { req }) => {
        const user = await User.findOne({
          where: {
            email: req.body.email
          }
        });
        if (user.password !== value) {
          throw new Error(`Password is does not match for user ${req.body.email}`);
        }
      })
  ];
};

const userValidationRegisterRules = () => {
  return [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is invalid')
      .custom(async (value) => {
        const isUserExist = await User.findOne({
          where: {
            email: value
          }
        });
        if (isUserExist) {
          throw new Error('Email already in use');
        }
      }),
    body('password')
      .isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ errors: errors.array() });
};

module.exports = {
  userValidationLoginRules,
  userValidationRegisterRules,
  validate
};