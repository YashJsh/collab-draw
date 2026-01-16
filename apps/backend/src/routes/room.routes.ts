import { Router } from "express";
import { createRoomController } from "../controllers/room.controller";
import { authMiddleware } from "../middleware/middleware";

const router: Router = Router();

router.route("/create").post(authMiddleware, createRoomController);

export default router;