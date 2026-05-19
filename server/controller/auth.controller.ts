import type { Response } from "express";
import type { AuthPayload, AuthRequest, UserRequest } from "../types/auth.type.js";
import { errorResponse, status, successResponse } from "../utils/response.js";
import { User } from "../models/auth.model.js";
import jwt from "jsonwebtoken";

const signToken = (payload: AuthPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT secret not defined");
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const register = async (req: AuthRequest, res: Response) => {
  if (req.user.type !== "REGISTER") return;
  try {
    const existingUser = await User.findOne({ email: req.user.email });
    if (existingUser)
      return res.status(status.BAD_REQUEST).json({
        ...errorResponse,
        message: "User with this email already exists",
      });
    const user = await User.create({
      name: req.user.name,
      email: req.user.email,
      password: req.user.password,
      role: req.user.role,
    });
    const token = signToken({ userId: user._id.toString(), role: user.role });
    return res.status(status.CREATED).json({
      ...successResponse,
      message: "User registered successfully",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ ...errorResponse, message: "Internal server error", error });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  if (req.user.type !== "LOGIN") return;
  try {
    const user = await User.findOne({ email: req.user.email }).select("+password");
    if (!user) {
      return res.status(status.NOT_FOUND).json({
        ...errorResponse,
        message: "Invalid email",
      });
    }
    const isMatch = await user.comparePassword(req.user.password);
    if (!isMatch) {
      return res.status(status.FORBIDDEN).json({
        ...errorResponse,
        message: "Invalid password",
      });
    }
    const token = signToken({ userId: user._id.toString(), role: user.role });
    return res.status(status.OK).json({
      ...successResponse,
      message: "User logged in successfully",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ ...errorResponse, message: "Internal server error", error });
  }
};

export const getMe = async (req: UserRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(status.NOT_FOUND).json({
        ...errorResponse,
        message: "User not found",
      });
    }
    return res.status(status.OK).json({
      ...successResponse,
      message: "User retrieved successfully",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ ...errorResponse, message: "Internal server error", error });
  }
};
