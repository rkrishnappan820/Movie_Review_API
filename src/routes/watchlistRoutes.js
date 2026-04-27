import express from 'express';
import {
  getAllWatchlistHandler,
  getWatchlistByIdHandler,
  createWatchlistHandler,
  deleteWatchlistByIdHandler,
  updateWatchlistByIdHandler,
  addMovieToWatchlistHandler,
  deleteMovieFromWatchlistHandler,
  getMovieByIdFromWatchlistHandler,
} from '../controllers/watchlistController.js';
import {
  validateGetAllWatchlists,
  validateWatchlistId,
  validateCreateAndUpdateWatchlist,
  validateMovieId,
  validateAddMovieToWatchlist,
} from '../middleware/validateWatchlist.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeWatchlistOwnership } from '../middleware/authorizeOwnership.js';

const watchlistRouter = express.Router();
watchlistRouter.get(
  '/',
  authenticate,
  validateGetAllWatchlists,
  getAllWatchlistHandler,
);
watchlistRouter.get(
  '/:id',
  authenticate,
  validateWatchlistId,
  getWatchlistByIdHandler,
);
watchlistRouter.post(
  '/',
  authenticate,
  validateCreateAndUpdateWatchlist,
  createWatchlistHandler,
);
watchlistRouter.delete(
  '/:id',
  authenticate,
  validateWatchlistId,
  authorizeWatchlistOwnership,
  deleteWatchlistByIdHandler,
);
watchlistRouter.put(
  '/:id',
  authenticate,
  validateWatchlistId,
  validateCreateAndUpdateWatchlist,
  authorizeWatchlistOwnership,
  updateWatchlistByIdHandler,
);

watchlistRouter.post(
  '/:id/movies',
  authenticate,
  validateWatchlistId,
  validateAddMovieToWatchlist,
  authorizeWatchlistOwnership,
  addMovieToWatchlistHandler,
);

watchlistRouter.delete(
  '/:id/movies/:movieId',
  authenticate,
  validateWatchlistId,
  validateMovieId,
  authorizeWatchlistOwnership,
  deleteMovieFromWatchlistHandler,
);

watchlistRouter.get(
  '/:id/movies',
  authenticate,
  validateWatchlistId,
  getMovieByIdFromWatchlistHandler,
);

export default watchlistRouter;
