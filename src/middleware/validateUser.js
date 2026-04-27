import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateCredentials = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email must exist')
    .bail()
    .trim()
    .isEmail()
    .withMessage('Invalid Email Address')
    .bail(),
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password must exist')
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage('Password must be between 8 - 15 characters long'),
  handleValidationErrors,
];
