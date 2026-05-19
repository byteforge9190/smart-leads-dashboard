import type { NextFunction, Response, Request } from "express";
import type { AuthPayload, UserRequest } from "../types/auth.type.js";
import { errorResponse, status } from "../utils/response.js";
import jwt from "jsonwebtoken";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(status.UNAUTHORIZED)
        .json({ ...errorResponse, message: "Unauthorized: No token provided" });
      return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      res
        .status(status.UNAUTHORIZED)
        .json({
          ...errorResponse,
          message: "Unauthorized: Invalid token format",
        });
      return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) return;

    const payload = jwt.verify(token, secret) as AuthPayload;
    (req as UserRequest).user = payload;
    next();
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ ...errorResponse, message: "Internal server error", error });
    next(error);
  }
};
