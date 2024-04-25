import { NextFunction, Request, Response } from "express";
import { CreateStoreInput } from "../dto/store.dto";
import * as StoreService from "../services/store.service";
import CustomError from "../utils/custom-error";

export const createStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = <CreateStoreInput>req.body;

  try {
    const { id: user_id } = res.locals.user;

    if (!user_id) {
      throw new CustomError("Not authorized", 401);
    }

    if (!name) {
      throw new CustomError("Name is required", 400);
    }

    const store = StoreService.createStore({ name, user_id });

    return res.json({
      status: "success",
      message: "Store created successfully!",
      data: store,
    });
  } catch (error) {
    console.log("[CREATE_STORE_CONTROLLER]", error);
    next(new Error("Error Creating Store"));
  }
};
