import { getId as getReviewId } from '../repositories/reviewRepo.js';
import { getId as getWatchlistId } from '../repositories/watchlistRepo.js';

export async function authorizeReviewOwnership(req, res, next) {
  const review = await getReviewId(parseInt(req.params.id));
  if (!review) {
    const error = new Error(`Review with Id ${req.params.id} not found`);
    error.status = 404;
    return next(error);
  }

  const authorReviewId = review.userId;

  if (req.user.id === authorReviewId) {
    return next();
  } else {
    const error = new Error('Forbidden: insufficient permission');
    error.status = 403;
    return next(error);
  }
}

export async function authorizeWatchlistOwnership(req, res, next) {
  const watchlist = await getWatchlistId(parseInt(req.params.id));
  if (!watchlist) {
    const error = new Error(`Watchlist with Id ${req.params.id} not found`);
    error.status = 404;
    return next(error);
  }
  const userWatchlistId = watchlist.userId;

  if (req.user.id === userWatchlistId) {
    return next();
  } else {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
}
