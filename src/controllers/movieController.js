import {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
} from '../services/movieService.js';

export async function getAllMoviesHandler(req, res) {
  const {
    search = '',
    offset = 0,
    limit = 5,
    order = 'asc',
    sort = 'id',
  } = req.query;

  const queryCommands = {
    search,
    offset: parseInt(offset),
    limit: parseInt(limit),
    order,
    sort,
  };

  const movies = await getAllMovies(queryCommands);
  res.status(200).json(movies);
}
export async function getMovieByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const specifiedMovie = await getMovieById(id);
  res.status(200).json(specifiedMovie);
}

export async function createMovieHandler(req, res) {
  const { director, genre, rating, runtime, title, yearOfRelease } = req.body;
  const data = {
    director,
    genre,
    rating,
    runtime: parseInt(runtime),
    title,
    yearOfRelease: parseInt(yearOfRelease),
  };
  const newMovie = await createMovie(data);
  res.status(201).json(newMovie);
}

export async function deleteMovieHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteMovie(id);
  res.status(204).send();
}

export async function updateMovieHandler(req, res) {
  const id = parseInt(req.params.id);
  const { director, genre, rating, runtime, title, yearOfRelease } = req.body;
  const data = {
    director,
    genre,
    rating,
    runtime: runtime ? parseInt(runtime) : undefined,
    title,
    yearOfRelease: yearOfRelease ? parseInt(yearOfRelease) : undefined,
  };
  const modifiedMovie = await updateMovie(id, data);
  res.status(200).json(modifiedMovie);
}
