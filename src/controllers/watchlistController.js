import {
  getAllWatchlists,
  getWatchlistById,
  createWatchlist,
  deleteWatchlist,
  updateWatchlist,
  addMovieToWatchlist,
  deleteMovieFromWatchlist,
  getMovieByIdFromWatchlist,
} from '../services/watchlistService.js';

export async function getAllWatchlistHandler(req, res) {
  const {
    search = '',
    offset = 0,
    limit = 5,
    order = 'asc',
    sort = 'id',
  } = req.query;
  const queryArgs = {
    search,
    offset: parseInt(offset),
    limit: parseInt(limit),
    order,
    sort,
  };
  const allWatchlists = await getAllWatchlists(queryArgs);
  res.status(200).json(allWatchlists);
}

export async function getWatchlistByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const specifiedMovie = await getWatchlistById(id);
  res.status(200).json(specifiedMovie);
}

export async function createWatchlistHandler(req, res) {
  const { watchlistName } = req.body;
  const data = { watchlistName, userId: req.user.id };
  console.log(data);

  const newMovielist = await createWatchlist(data);
  res.status(201).json(newMovielist);
}

export async function deleteWatchlistByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteWatchlist(id);
  res.status(204).send();
}

export async function updateWatchlistByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const { watchlistName } = req.body;
  const data = { watchlistName };
  const updatedWatchList = await updateWatchlist(id, data);
  res.status(200).json(updatedWatchList);
}

export async function addMovieToWatchlistHandler(req, res) {
  const movieId = parseInt(req.body.movieId);
  const watchlistId = parseInt(req.params.id);

  const addedMovie = await addMovieToWatchlist(movieId, watchlistId);
  res.status(201).json(addedMovie);
}

export async function deleteMovieFromWatchlistHandler(req, res) {
  const movieId = parseInt(req.params.movieId);
  const watchlistId = parseInt(req.params.id);

  await deleteMovieFromWatchlist(movieId, watchlistId);
  res.status(204).send();
}

export async function getMovieByIdFromWatchlistHandler(req, res) {
  const id = parseInt(req.params.id);
  const movies = await getMovieByIdFromWatchlist(id);
  res.status(200).json(movies);
}
