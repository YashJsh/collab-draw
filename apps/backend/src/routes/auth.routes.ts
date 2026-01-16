import { Router } from "express";
import { signInController, signUpController } from "../controllers/auth.controller";

const router : Router = Router();

router.route("/signup").post(signUpController);
router.route("/login").post(signInController); 

export default router;