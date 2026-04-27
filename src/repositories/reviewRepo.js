import prisma from '../config/db.js';

export async function create(data) {
  try {
    const newReview = await prisma.review.create({ data });
    return newReview;
  } catch (err) {
    if (err.code === 'P2003') {
      const error = new Error(
        'userId or movieId references a value that does not exist',
      );
      error.status = 400;
      throw error;
    }
  }
}

export async function update(data, id) {
  try {
    const updatedReview = await prisma.review.update({ data, where: { id } });
    return updatedReview;
  } catch (err) {
    if (err.code === 'P2025') {
      return null;
    }
    throw err;
  }
}

export async function remove(id) {
  try {
    const deletedPost = await prisma.review.delete({ where: { id } });
    return deletedPost;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function getId(id) {
  const review = await prisma.review.findUnique({ where: { id } });
  return review;
}

export async function getAll({ search, offset, limit, order, sort }) {
  const conditions = {};
  if (search) {
    conditions.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  const reviews = await prisma.review.findMany({
    where: conditions,
    orderBy: { [sort]: order },
    take: limit,
    skip: offset,
  });

  return reviews;
}
