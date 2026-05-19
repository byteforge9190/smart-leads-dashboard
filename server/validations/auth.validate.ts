import joi from 'joi';
import type { LoginRequest, RegisterRequest } from '../types/auth.type.js';

export const registerSchema = joi.object<RegisterRequest>({
  name: joi.string().min(3).max(50).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  role: joi.string().valid('ADMIN', 'SALES').required(),
});

export const loginSchema = joi.object<LoginRequest>({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});