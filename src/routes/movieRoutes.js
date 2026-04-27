import {
  createMovieHandler,
  deleteMovieHandler,
  getAllMoviesHandler,
  getMovieByIdHandler,
  updateMovieHandler,
} from '../controllers/movieController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  validateMovieId,
  validateMovieQueryParams,
  validateCreateMovie,
  validateUpdateMovie,
} from '../middleware/validateMovie.js';
import express from 'express';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const movieRouter = express.Router();
movieRouter.get(
  '/',
  authenticate,
  validateMovieQueryParams,
  getAllMoviesHandler,
);
movieRouter.get('/:id', authenticate, validateMovieId, getMovieByIdHandler);
movieRouter.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  validateCreateMovie,
  createMovieHandler,
);
movieRouter.delete(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  validateMovieId,
  deleteMovieHandler,
);

movieRouter.put(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  validateMovieId,
  validateUpdateMovie,
  updateMovieHandler,
);

export default movieRouter;
