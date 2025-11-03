import express from 'express';
import { applySecurity } from './middlewares/security.js';
import { applyLogging } from './middlewares/logging.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

applySecurity(app);
applyLogging(app);

const routes = (await import('./routes/index.js')).default;
app.use('/', routes);

app.use(errorHandler);

export { app };