import Joi from 'joi';

const chatSchema = Joi.object({
  messages: Joi.array().items(
    Joi.object({
      role: Joi.string().valid('system', 'user', 'assistant').required(),
      content: Joi.string().required(),
    })
  ).optional(),
  text: Joi.string().trim().min(1).max(4000).optional(),
  model: Joi.string().optional(),
  temperature: Joi.number().min(0).max(2).optional(),
  maxTokens: Joi.number().integer().min(1).optional(),
  stream: Joi.boolean().optional(),
});

export const validateChatRequest = (req, res, next) => {
  const { error } = chatSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  if (!req.body.messages && !req.body.text) {
    return res.status(400).json({ error: 'Either "messages" or "text" is required.' });
  }
  next();
};