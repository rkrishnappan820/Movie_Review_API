import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 3,
  handler: function (req, res, next) {
    const error = new Error('Exceeded max login attempts for given interval');
    error.status = 429;
    return next(error);
  },
});
