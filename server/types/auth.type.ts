import type { Request } from "express";
import { Types } from "mongoose";
export type UserRole = "ADMIN" | "SALES";
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthPayload {
  userId: string;
  role: UserRole;
}
export interface AuthRequest extends Request {
  user: AuthPayload;
}
