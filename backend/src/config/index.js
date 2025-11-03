import path from 'path';
import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
  PORT: Joi.number().default(5000),
  OPENROUTER_KEY: Joi.string().required().description('OpenRouter API Key is required'),
  APP_URL: Joi.string().uri().required().description('App URL is required for OpenRouter headers'),
  APP_NAME: Joi.string().required().description('App Name is required for OpenRouter headers'),
}).unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  openRouter: {
    key: envVars.OPENROUTER_KEY,
    appUrl: envVars.APP_URL,
    appName: envVars.APP_NAME,
  },
  apiTimeout: 30000,
};