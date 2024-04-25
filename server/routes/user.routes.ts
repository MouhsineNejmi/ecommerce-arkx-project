import { Router } from "express";

import * as UserController from "../controllers/user.controller";

const router = Router();

import deserializeUser from "../middlewares/deserialize-user.middleware";
import requireUser from "../middlewares/require-user.middleware";
import { restrictTo } from "../middlewares/restrict-to.middleware";

router.use(deserializeUser, requireUser);

router
  .get("/", restrictTo("admin"), UserController.getAllUsers)
  .get("/profile", UserController.getMyProfile)
  .get("/user/:id", restrictTo("admin", "manager"), UserController.getUserById)
  .get("/user", restrictTo("admin", "manager"), UserController.searchUser)
  .put("/user/:id", restrictTo("admin"), UserController.updateUser)
  .delete("/user/:id", restrictTo("admin"), UserController.deleteUser);

export default router;
