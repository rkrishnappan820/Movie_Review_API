import prisma from '../config/db.js';

export async function createUser(data) {
  try {
    const newUser = await prisma.user.create({
      data,
      omit: { password: true },
    });
    return newUser;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Email has already been taken by another user');
      err.status = 409;
      throw err;
    } else {
      throw error;
    }
  }
}

export async function getInfo(email) {
  const userInfo = await prisma.user.findUnique({
    where: { email },
  });
  return userInfo;
}
