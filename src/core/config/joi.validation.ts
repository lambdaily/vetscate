import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(8000),
  ENVIRONMENT: Joi.string().default('local'),
  JWT_SECRET: Joi.required(),
});
