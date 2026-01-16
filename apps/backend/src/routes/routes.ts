import { Router } from "express";
import authRouter from "./auth.routes";
import roomRouter from "./room.routes";

const router : Router = Router();

router.use("/auth", authRouter);
router.use("/rooms", roomRouter);

export default router;