import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()


export interface RequestWithAdmin extends Request {
  admin?: any // Use any or define a more specific type
}

export const adminAuthMiddleware = (
  req: RequestWithAdmin,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = verifyToken(token);
    if (decoded && typeof decoded === "object" && "adminId" in decoded) {
      req.admin = decoded; // Add admin info to the request object
      next();
    } else {
      return res.status(403).send("Access denied. Not an admin.");
    }
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

