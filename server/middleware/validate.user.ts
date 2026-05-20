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
  // allow token via Authorization header, query param `token`, or cookie `auth_token`
  let token: string | undefined;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.query && (req.query as any).token) {
    token = String((req.query as any).token);
  } else if ((req as any).cookies && (req as any).cookies.auth_token) {
    token = (req as any).cookies.auth_token;
  }

  if (!token) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ ...errorResponse, message: "Unauthorized: No token provided" });
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