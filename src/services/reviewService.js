import {
  create,
  update,
  remove,
  getId,
  getAll,
} from '../repositories/reviewRepo.js';

export async function createReview(data) {
  console.log(data);

  const newReview = await create(data);
  return newReview;
}

export async function updateReview(data, id) {
  const updatedReview = await update(data, id);
  if (updatedReview) {
    return updatedReview;
  } else {
    const error = new Error(`Review with id ${id} is not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteReview(id) {
  const deletedReview = await remove(id);
  if (deletedReview) {
    return;
  } else {
    const error = new Error(`Review with id ${id} is not found`);
    error.status = 404;
    throw error;
  }
}

export async function getReviewById(id) {
  const review = await getId(id);
  if (review) return review;
  const error = new Error(`Review with ${id} is not found`);
  error.status = 404;
  throw error;
}

export async function getAllReviews(queryParams) {
  return await getAll(queryParams);
}
