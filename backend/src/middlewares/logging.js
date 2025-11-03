import morgan from 'morgan';

export const applyLogging = (app) => {
  app.use(morgan('combined'));
};