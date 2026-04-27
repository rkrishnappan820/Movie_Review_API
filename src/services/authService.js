import { createUser, getInfo } from '../repositories/userRepo.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signUp(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = createUser({ email, password: hashedPassword });
  if (newUser) return newUser;
}

export async function login(email, password) {
  const userInfo = await getInfo(email);
  const error = new Error('Email or Password is invalid');
  error.status = 401;

  if (!userInfo) throw error;

  const isSamePassword = await bcrypt.compare(password, userInfo.password);
  if (isSamePassword) {
    const token = jwt.sign(
      { id: userInfo.id, role: userInfo.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    return token;
  } else {
    throw error;
  }
}
