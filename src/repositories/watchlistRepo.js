import prisma from '../config/db.js';

export async function getAll({ search, offset, limit, order, sort }) {
  const allWatchLists = await prisma.watchlist.findMany({
    where: { watchlistName: { contains: search, mode: 'insensitive' } },
    take: limit,
    skip: offset,
    orderBy: { [sort]: order },
  });

  return allWatchLists;
}

export async function getId(id) {
  const watchlist = await prisma.watchlist.findUnique({ where: { id } });
  return watchlist;
}

export async function create(data) {
  try {
    const newWatchlist = await prisma.watchlist.create({ data });
    return newWatchlist;
  } catch (error) {
    if (error.code === 'P2002') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const removedWatchlist = await prisma.watchlist.delete({ where: { id } });
    return removedWatchlist;
  } catch (error) {
    throw error;
  }
}

export async function update(id, data) {
  try {
    const updatedWatchlist = await prisma.watchlist.update({
      where: { id },
      data,
    });
    return updatedWatchlist;
  } catch (error) {
    throw error;
  }
}

export async function addMovie(movieId, watchlistId) {
  try {
    await prisma.watchlist.update({
      where: { id: watchlistId },
      data: {
        movies: { connect: { id: movieId } },
      },
    });
    const addedMovie = prisma.movie.findUnique({ where: { id: movieId } });
    return addedMovie;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function deleteMovie(movieId, watchlistId) {
  try {
    const movieToDelete = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movieToDelete) return null;

    const moviesInWatchlist = await getMovieFromWatchlist(watchlistId);

    const isMovieInWatchlist = Object.values(moviesInWatchlist.movies).some(
      (movie) => movie.id === movieToDelete.id,
    );
    if (!isMovieInWatchlist) return null;

    const deletedMovie = await prisma.watchlist.update({
      where: { id: watchlistId },
      data: {
        movies: { disconnect: { id: movieId } },
      },
    });
    return deletedMovie;
  } catch (error) {
    throw error;
  }
}

export async function getMovieFromWatchlist(id) {
  const movies = prisma.watchlist.findUnique({
    where: { id },
    include: { movies: true },
  });
  return movies;
}
