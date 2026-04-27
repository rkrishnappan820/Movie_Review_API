import { body, query, param, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateMovieId = [
  param('id')
    .exists({ checkFalsy: true })
    .withMessage('Id must exist')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Movie Id must have minimum value of 1')
    .bail(),
  handleValidationErrors,
];

export const validateMovieQueryParams = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be between 1 and 50'),
  query('offset')
    .optional()
    .isInt({ min: 1 })
    .withMessage('offset must have a minimum value of at least 1'),
  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('order must be either asc or desc'),
  query('sort')
    .optional()
    .isIn([
      'id',
      'director',
      'genre',
      'runtime',
      'rating',
      'yearOfRelease',
      'title',
    ])
    .withMessage(
      'Sort must contain value of id, director, genre, runtime, rating, yearOfRelease, title',
    ),
  handleValidationErrors,
];

export const validateCreateMovie = [
  body('director')
    .exists({ checkFalsy: true })
    .withMessage('Director must exist')
    .bail()
    .isString()
    .withMessage('Director must be of type string')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage('Director name must be at least 5 characters long'),
  body('genre')
    .exists({ checkFalsy: true })
    .withMessage('genre must exist')
    .trim()
    .escape()
    .isIn([
      'Action',
      'Adventure',
      'Animation',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Fantasy',
      'Horror',
      'Musical',
      'Mystery',
      'Romance',
      'Sci-Fi',
      'Thriller',
      'Western',
    ])
    .withMessage(
      'genre must be of either Action, Adventure, Animation, Comedy, Crime, Documentary, Drama, Fantasy, Horror, Musical, Mystery, Romance, Sci-Fi, Thriller, or Western',
    ),

  body('title')
    .exists({ checkFalsy: true })
    .withMessage('title must exist')
    .bail()
    .isString()
    .withMessage('title must be of type string')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage('title name must be at least 4 characters long'),
  body('rating')
    .exists({ checkFalsy: true })
    .withMessage('rating must exist')
    .bail()
    .isIn(['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR/UR'])
    .withMessage('rating must be either G, PG, PG-13, R, NC-17, or NR/UR')
    .bail(),
  body('runtime')
    .exists({ checkFalsy: true })
    .withMessage('runtime must exist')
    .bail()
    .isInt({ min: 80 })
    .withMessage('runtime must have a minimum value of 80 mins '),
  body('yearOfRelease')
    .exists({ checkFalsy: true })
    .withMessage('year of release must exist')
    .bail()
    .isInt({ min: 1906, max: 2026 })
    .withMessage('year of release must come between 1906 to 2026'),
  handleValidationErrors,
];

export const validateUpdateMovie = [
  oneOf(
    [
      body('director').exists({ checkFalsy: true }),
      body('genre').exists({ checkFalsy: true }),
      body('title').exists({ checkFalsy: true }),
      body('rating').exists({ checkFalsy: true }),
      body('runtime').exists({ checkFalsy: true }),
      body('yearOfRelease').exists({ checkFalsy: true }),
    ],
    {
      message:
        'At least one of director, genre, title, rating, runtime, or yearOfRelease must be present',
    },
  ),
  body('director')
    .optional()
    .isString()
    .withMessage('Director must be of type string')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage('Director name must be at least 5 characters long'),
  body('genre')
    .optional()
    .trim()
    .escape()
    .isIn([
      'Action',
      'Adventure',
      'Animation',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Fantasy',
      'Horror',
      'Musical',
      'Mystery',
      'Romance',
      'Sci-Fi',
      'Thriller',
      'Western',
    ])
    .withMessage(
      'genre must be of either Action, Adventure, Animation, Comedy, Crime, Documentary, Drama, Fantasy, Horror, Musical, Mystery, Romance, Sci-Fi, Thriller, or Western',
    )
    .bail(),

  body('title')
    .optional()
    .isString()
    .withMessage('title must be of type string')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage('title name must be at least 4 characters long'),
  body('rating')
    .optional()
    .isIn(['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR/UR'])
    .withMessage('rating must be either G, PG, PG-13, R, NC-17, or NR/UR')
    .bail(),
  body('runtime')
    .optional()
    .isInt({ min: 80 })
    .withMessage('runtime must have a minimum value of 80 mins '),
  body('yearOfRelease')
    .optional()
    .isInt({ min: 1906, max: 2026 })
    .withMessage('year of release must come between 1906 to 2026'),
  handleValidationErrors,
];
