import type { NextFunction, Response, Request } from "express";
import type { AuthPayload, UserRequest, UserRole } from "../types/auth.type.js";
import { errorResponse, status } from "../utils/response.js";
import jwt from "jsonwebtoken";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ ...errorResponse, message: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(status.UNAUTHORIZED).json({
      ...errorResponse,
      message: "Unauthorized: Invalid token format",
    });
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) return;

  try {
    const payload = jwt.verify(token, secret) as AuthPayload;
    (req as UserRequest).user = payload;
    next();
  } catch (error) {
    return res
      .status(status.FORBIDDEN)
      .json({ ...errorResponse, message: "Forbidden: Invalid token", error });
  }
};

export const validateRole = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as UserRequest
    if (!authReq.user) {
      res.status(401).json({ success: false, message: 'Not authenticated.' });
      return;
    }

    if (!roles.includes(authReq.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
      });
      return;
    }

    next();
  };
};