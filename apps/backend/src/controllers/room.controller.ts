import { asyncHandler } from "../utils/asyncHandler.js";
import { createRoomSchema } from "@repo/common";
import { z } from "zod";

import type { Request, Response } from "express";
import { client } from "../utils/prisma.js";

const createRoomController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name } = createRoomSchema.parse(req.body);

      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "User authentication required",
        });
      }

      const room = await client.room.create({
        data: {
          name,
          ownerId: userId,
        },
        include: {
          owner: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      return res.status(201).json({
        success: true,
        message: "Room created successfully",
        data: {
          room,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.message,
        });
      }
      throw error;
    }
  },
);

export { createRoomController };
