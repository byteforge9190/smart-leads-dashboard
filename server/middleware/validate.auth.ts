import type { NextFunction, Response, Request } from "express";
import type { AuthRequest } from "../types/auth.type.js";
import { loginSchema, registerSchema } from "../validations/auth.validate.js";
import { errorResponse } from "../utils/response.js";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error)
    return res.status(400).json({
      ...errorResponse,
      message: "Validation failed",
      error: error.details.map((d) => d.message).join(", "),
    });

  (req as AuthRequest).auth = value;
  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error)
    return res.status(400).json({
      ...errorResponse,
      message: "Validation failed",
      error: error.details.map((d) => d.message).join(", "),
    });

  (req as AuthRequest).auth = value;
  next();
};
