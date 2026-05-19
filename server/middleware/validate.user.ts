import type { NextFunction, Response } from "express";
import type { AuthPayload, AuthRequest } from "../types/auth.type.js";
import { errorResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";


export const validateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ ...errorResponse, message: 'Unauthorized: No token provided' });
            return;
        }
        const token = authHeader.split(' ')[1];
        if(!token) {
            res.status(401).json({ ...errorResponse, message: 'Unauthorized: Invalid token format' });
            return;
        }
        const secret = process.env.JWT_SECRET;
        if(!secret) return

        const payload = jwt.verify(token, secret) as AuthPayload;
        req.user = payload;
        next();
        

    } catch (error) {
        res.status(500).json({ ...errorResponse, message: 'Internal server error', error});
        next(error);
    }
}