import { Router } from "express";
import { createRoomController } from "../controllers/room.controller.js";
import { authMiddleware } from "../middleware/middleware.js";

const router: Router = Router();

router.route("/create").post(authMiddleware, createRoomController);

export default router;