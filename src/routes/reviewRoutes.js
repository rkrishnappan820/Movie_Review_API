import {
  createReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
  getReviewByIdHandler,
  getAllReviewsHandler,
} from '../controllers/reviewHandler.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeReviewOwnership } from '../middleware/authorizeOwnership.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import {
  validateReviewId,
  validateCreateReview,
  validateUpdateReview,
  validateGetAllReviews,
} from '../middleware/validateReview.js';
import express from 'express';

const reviewRouter = express.Router();

reviewRouter.post(
  '/',
  authenticate,
  authorizeRoles('MEMBER'),
  validateCreateReview,
  createReviewHandler,
);
reviewRouter.put(
  '/:id',
  authenticate,
  validateReviewId,
  authorizeReviewOwnership,
  validateUpdateReview,
  updateReviewHandler,
);
reviewRouter.delete(
  '/:id',
  authenticate,
  validateReviewId,
  authorizeReviewOwnership,
  deleteReviewHandler,
);
reviewRouter.get('/:id', authenticate, validateReviewId, getReviewByIdHandler);
reviewRouter.get(
  '/',
  authenticate,
  validateGetAllReviews,
  getAllReviewsHandler,
);

export default reviewRouter;
