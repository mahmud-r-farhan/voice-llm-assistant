import express from 'express';

const router = express.Router();

router.use('/health', (await import('./health.js')).default);
router.use('/api/chat', (await import('./chat.js')).default);

// 404 handler
router.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

export default router;