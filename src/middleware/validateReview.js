import { body, param, query, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateReviewId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Id must be an minimum integer of 1 ')
    .bail(),
  handleValidationErrors,
];

export const validateCreateReview = [
  body('starRating')
    .isFloat({ min: 0, max: 10 })
    .withMessage('Star rating must be a float between 0 - 10')
    .bail(),

  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Title must exist')
    .bail()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must have a minimum of 3 characters'),

  body('description')
    .exists({ checkFalsy: true })
    .withMessage('Description must exist')
    .bail()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage('Description must have a minimum of 5 characters'),
  body('movieId')
    .isInt({ min: 1 })
    .withMessage('Movie Id must be an integer of minimum 1')
    .bail(),

  handleValidationErrors,
];

export const validateUpdateReview = [
  oneOf(
    [
      body('starRating').exists(),
      body('description').exists({ checkFalsy: true }),
      body('title').exists({ checkFalsy: true }),
    ],
    {
      message:
        'At least one of the fields (starRating, description, or title) must be provided',
    },
  ),
  body('starRating')
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage('Star rating must be a float between 0 - 10')
    .bail(),

  body('title')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage('Title must exist')
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must have a minimum of 3 characters'),

  body('description')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage('Description must exist')
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .bail()
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage('Description must have a minimum of 5 characters'),
  handleValidationErrors,
];

export const validateGetAllReviews = [
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage("Order must be either 'asc' or 'desc'"),
  query('sort')
    .optional()
    .isIn(['id', 'createdAt', 'movieId', 'starRating', 'userId'])
    .withMessage(
      'Must only sort Reviews by id, createdAt, movieId, starRating, and userId',
    ),
  handleValidationErrors,
];
