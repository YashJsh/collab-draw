import { NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyToken } from "../utils/tokenManagment";

import type { Request, Response } from "express";
import { client } from "../utils/prisma";


const middleware = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required"
      });
    }

    const token = authHeader.substring(7);
    
    const decoded = verifyToken(token);
    
    const user = await client.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token - user not found"
      });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
});

export { middleware as authMiddleware };
