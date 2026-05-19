import Joi from 'joi';
import type { LoginRequest, RegisterRequest } from '../types/auth.type.js';

export const registerSchema = Joi.object<RegisterRequest>({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('ADMIN', 'SALES').required(),
});

export const loginSchema = Joi.object<LoginRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});