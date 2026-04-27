import {
  getAll,
  getById,
  create,
  remove,
  update,
} from '../repositories/movieRepo.js';

export async function getAllMovies(queryCommands) {
  const movies = await getAll(queryCommands);
  return movies;
}

export async function getMovieById(id) {
  const movie = await getById(id);
  if (movie) return movie;
  const error = new Error(`Movie with Id ${id} does not exist`);
  error.status = 404;
  throw error;
}

export async function createMovie(data) {
  const newMovie = await create(data);
  return newMovie;
}

export async function deleteMovie(id) {
  const removedMovie = await remove(id);
  if (removedMovie) return;
  const error = new Error(`Movie with Id ${id} does not exist`);
  error.status = 404;
  throw error;
}

export async function updateMovie(id, data) {
  const updatedMovie = await update(id, data);
  if (updatedMovie) return updatedMovie;
  const error = new Error(`Movie with Id ${id} does not exist`);
  error.status = 404;
  throw error;
}
