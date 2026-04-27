import jwt from 'jsonwebtoken';

export async function authenticate(req, res, next) {
  const error = new Error('Not authenticated. Please provide a valid token.');
  error.status = 401;

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next(error);

  const jwtToken = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    return next(error);
  }
}
