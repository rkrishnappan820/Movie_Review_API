import {
  getAll,
  getId,
  create,
  remove,
  update,
  addMovie,
  deleteMovie,
  getMovieFromWatchlist,
} from '../repositories/watchlistRepo.js';

export async function getAllWatchlists(queryArgs) {
  const allWatchlists = await getAll(queryArgs);
  return allWatchlists;
}

export async function getWatchlistById(id) {
  const specificWatchlist = await getId(id);
  if (specificWatchlist) return specificWatchlist;
  const error = new Error(`Watchlist with id ${id} does not exist`);
  error.status = 404;
  throw error;
}

export async function createWatchlist(data) {
  const newWatchlist = await create(data);
  if (newWatchlist) return newWatchlist;
  const error = new Error('A User can only create at most one watchlist');
  error.status = 400;
  throw error;
}

export async function deleteWatchlist(id) {
  return await remove(id);
}

export async function updateWatchlist(id, data) {
  return await update(id, data);
}

export async function addMovieToWatchlist(movieId, watchlistId) {
  const addedMovie = await addMovie(movieId, watchlistId);
  if (addedMovie) return addedMovie;
  const error = new Error(`Movie with id ${movieId} does not exist`);
  error.status = 404;
  throw error;
}

export async function deleteMovieFromWatchlist(movieId, watchlistId) {
  const isDeleted = await deleteMovie(movieId, watchlistId);
  if (isDeleted) return;
  const error = new Error(`Movie with id ${movieId} does not exist`);
  error.status = 404;
  throw error;
}

export async function getMovieByIdFromWatchlist(id) {
  const movies = await getMovieFromWatchlist(id);
  if (movies) return movies;
  const error = new Error(`Watchlist with id ${id} does not exist`);
  error.status = 404;
  throw error;
}
