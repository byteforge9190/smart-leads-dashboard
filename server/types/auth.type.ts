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
export interface RegisterRequest {
  type: 'REGISTER'; 
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
export interface LoginRequest {
  type: 'LOGIN';
  email: string;
  password: string;
}
export interface AuthRequest extends Request {
  auth: RegisterRequest | LoginRequest;
}

export interface AuthPayload {
  userId: string;
  role: UserRole;
}
export interface UserRequest extends Request {
  user: AuthPayload;
}
