import { Router } from "express";

import deserializeUser from "../middlewares/deserialize-user.middleware";
import requireUser from "../middlewares/require-user.middleware";
import { validate } from "../middlewares/validate.middleware";

import * as AuthController from "../controllers/auth.controller";

import { createUserSchema } from "../schemas/user.schema";
import { loginSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/register", validate(createUserSchema), AuthController.register);

router.post("/login", validate(loginSchema), AuthController.login);

router.use(deserializeUser, requireUser);

router.post("/logout", AuthController.logout);

export default router;
