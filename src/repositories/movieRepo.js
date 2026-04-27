import prisma from '../config/db.js';

export async function getAll({ search, limit, offset, sort, order }) {
  const conditions = {};

  if (search) {
    conditions.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { director: { contains: search, mode: 'insensitive' } },
    ];
  }

  const movies = await prisma.movie.findMany({
    where: conditions,
    orderBy: { [sort]: order },
    take: limit,
    skip: offset,
  });

  return movies;
}

export async function getById(id) {
  const movie = await prisma.movie.findUnique({ where: { id } });
  return movie;
}

export async function create(data) {
  const newMovie = await prisma.movie.create({ data });
  return newMovie;
}

export async function remove(id) {
  try {
    return await prisma.movie.delete({ where: { id } });
  } catch (err) {
    if (err.code === 'P2025') return null;
    return err;
  }
}

export async function update(id, data) {
  try {
    return await prisma.movie.update({ data, where: { id } });
  } catch (err) {
    if (err.code === 'P2025') return null;
    throw err;
  }
}
