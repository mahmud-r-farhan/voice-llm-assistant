import dotenv from 'dotenv';
import { app } from './src/app.js';

dotenv.config();
app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
  console.log(`🚀 Backend running on http://localhost:${app.get('port')}`);
  console.log(`📊 Health check available at http://localhost:${app.get('port')}/health`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('Closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);