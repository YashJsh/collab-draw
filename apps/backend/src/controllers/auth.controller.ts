import { asyncHandler } from "../utils/asyncHandler.js";
import { z } from "zod";
import bcrypt from "bcrypt";

import { signUpSchema, signInSchema } from "@repo/common";
import { generateToken } from "../utils/tokenManagment.js";
import type { Request, Response } from "express";
import { client } from "../utils/prisma.js";

const signUpController = asyncHandler(async(req: Request, res: Response) => {
  try {
    const { email, password } = signUpSchema.parse(req.body);

    const existingUser = await client.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await client.user.create({
      data: {
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const token = generateToken(user.id);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user,
        token
      }
    });
  } catch (error : any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.message
      });
    }
    throw error;
  }
});

const signInController = asyncHandler(async(req: Request, res: Response) => {
  try {
    const { email, password } = signInSchema.parse(req.body);

    const user = await client.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = generateToken(user.id);

    const userResponse = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return res.status(200).json({
      success: true,
      message: "Sign in successful",
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.message
      });
    }
    throw error;
  }
});

export { signUpController, signInController };