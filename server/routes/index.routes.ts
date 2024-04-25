import express from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import storeRoutes from "./store.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/stores", storeRoutes);

export default router;
