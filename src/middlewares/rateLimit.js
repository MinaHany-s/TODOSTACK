import rateLimit from 'express-rate-limit';

const defaultLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // adjust as needed for global usage
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

export default defaultLimiter;
