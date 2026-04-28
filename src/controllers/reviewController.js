import {
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
  getAllReviews,
} from '../services/reviewService.js';

export async function createReviewHandler(req, res) {
  const { starRating, title, description, movieId } = req.body;
  const newReview = await createReview({
    starRating: parseFloat(starRating),
    title,
    description,
    movieId,
    userId: req.user.id,
  });

  res.status(201).json(newReview);
}

export async function updateReviewHandler(req, res) {
  const { starRating, description, title } = req.body;

  const reviewId = req.params.id;

  const modifiedReview = await updateReview(
    { starRating, description, title },
    parseInt(reviewId),
  );

  res.status(200).json(modifiedReview);
}

export async function deleteReviewHandler(req, res) {
  const reviewId = req.params.id;

  const deletedReview = await deleteReview(parseInt(reviewId));

  res.status(204).send();
}

export async function getReviewByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const specificReview = await getReviewById(id);
  res.status(200).json(specificReview);
}

export async function getAllReviewsHandler(req, res) {
  const {
    search = '',
    offset = 0,
    limit = 5,
    order = 'asc',
    sort = 'id',
  } = req.query;

  const options = {
    search,
    offset: parseInt(offset),
    limit: parseInt(limit),
    order,
    sort,
  };

  const reviews = await getAllReviews(options);
  res.status(200).json(reviews);
}
