import { body, query, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateGetAllWatchlists = [
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
    .isIn(['userId', 'id'])
    .withMessage('Must only sort Watchlists by id or userId'),
  handleValidationErrors,
];

export const validateWatchlistId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('watchlistId must be an minimum integer of 1 ')
    .bail(),
  handleValidationErrors,
];

export const validateMovieId = [
  param('movieId')
    .isInt({ min: 1 })
    .withMessage('movieId must be an minimum integer of 1 ')
    .bail(),
  handleValidationErrors,
];

export const validateCreateAndUpdateWatchlist = [
  body('watchlistName')
    .exists({ checkFalsy: true })
    .withMessage('watchListName must exist')
    .bail()
    .isString()
    .withMessage('watchListName must be a string')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage('watchListName must have a minimum of 5 characters'),

  handleValidationErrors,
];

export const validateAddMovieToWatchlist = [
  body('movieId')
    .isInt({ min: 1 })
    .withMessage('movieId must be have a minimum integer of 1 ')
    .bail(),
  handleValidationErrors,
];
