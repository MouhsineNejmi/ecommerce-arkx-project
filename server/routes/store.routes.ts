import { Router } from "express";
import * as StoreController from "../controllers/store.controller";

const router = Router();

router.post("/", StoreController.createStore);

export default router;
