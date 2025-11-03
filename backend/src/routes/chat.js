import express from 'express';
import config from '../config/index.js';
import fetchWithTimeout from '../utils/fetchWithTimeout.js';
import { validateChatRequest } from '../middlewares/validation.js';

const router = express.Router();

router.post('/', validateChatRequest, async (req, res) => {
  const { messages, text, model, temperature, maxTokens, stream = false } = req.body;

  if (!config.openRouter.key) {
    return res.status(500).json({ error: 'Server configuration error. API key not found.' });
  }

  // Construct messages array
  let apiMessages = [
    { role: 'system', content: 'You are a helpful, concise, and friendly assistant.' },
  ];

  if (messages) {
    apiMessages = [...apiMessages, ...messages];
  } else if (text) {
    apiMessages.push({ role: 'user', content: text });
  }

  try {
    const apiBody = {
      model: model || 'mistralai/mistral-7b-instruct',
      messages: apiMessages,
      temperature: temperature || 0.7,
      max_tokens: maxTokens || 1000,
      stream,
    };

    const response = await fetchWithTimeout(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.openRouter.key}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': config.openRouter.appUrl,
          'X-Title': config.openRouter.appName,
        },
        body: JSON.stringify(apiBody),
      },
      config.apiTimeout
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || 'Failed to get response from AI service.',
        code: errorData.error?.code,
      });
    }

    if (stream) {
      // Set SSE headers and pipe the stream directly
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      response.body.pipe(res);

      response.body.on('end', () => res.end());
      response.body.on('error', (err) => {
        console.error('Stream error:', err);
        res.status(500).end();
      });
    } else {
      // Non-streaming (legacy)
      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;

      if (!reply) {
        return res.status(500).json({ error: 'Invalid response from AI service.' });
      }

      res.json({
        text: reply.trim(),
        model: data.model,
        usage: data.usage,
      });
    }
  } catch (error) {
    console.error('Chat endpoint error:', error);
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Request timeout. Please try again.' });
    }
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
});

export default router;