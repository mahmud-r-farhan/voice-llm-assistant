import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

export const applySecurity = (app) => {

  // Helmet for security headers
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: '*',
      methods: ['POST', 'GET'],
      credentials: true,
    })
  );

  // Rate limiting on /api/
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api/', limiter);
};