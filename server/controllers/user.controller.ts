import { NextFunction, Request, Response } from "express";

import * as UserService from "../services/user.service";
import { UpdateUserInput } from "../dto/user.dto";

import { exclude } from "../helpers/helpers";
import CustomError from "../utils/custom-error";

export const getMyProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    return res.json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;

  const resultsPerPage = 10;
  const sort =
    query.sort === "asc" || query.sort === "desc" ? query.sort : "desc";
  const page =
    typeof query.page === "string" && parseInt(query.page) >= 1
      ? parseInt(query.page)
      : 1;

  try {
    const users = await UserService.findAllUsers({
      sort,
      page,
      resultsPerPage,
    });

    return res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await UserService.findUserById(id);

    if (!user) {
      throw new CustomError("User not found.", 404);
    }

    return res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new CustomError(error.message, 500));
    }

    throw new CustomError("Internal Server Error", 500);
  }
};

export const searchUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;

  const resultsPerPage = 10;
  const sort =
    query.sort === "asc" || query.sort === "desc" ? query.sort : "desc";
  const page =
    typeof query.page === "string" && parseInt(query.page) >= 1
      ? parseInt(query.page)
      : 1;

  const username =
    typeof query.username === "string" ? query.username : undefined;

  try {
    const users = await UserService.findUser(
      { username },
      {
        sort,
        page,
        resultsPerPage,
      }
    );

    if (!users) {
      throw new CustomError("No user with this username found", 404);
    }

    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new CustomError(error.message, 500));
    }

    throw new CustomError("Internal Server Error", 500);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { username, role, active } = <UpdateUserInput>req.body;

  try {
    const updatedFields = {
      username,
      role,
      active,
    };

    const existingUser = await UserService.findUser({ username });
    if (existingUser) {
      throw new CustomError(
        "User with this username already exist try another username.",
        400
      );
    }

    const user = await UserService.findUserByIdAndUpdate(id, updatedFields);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return res.json({
      status: "success",
      message: "User updated successfully.",
      data: { user },
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new CustomError(error.message, 500));
    }

    throw new CustomError("Internal Server Error", 500);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await UserService.findUserByIdAndDelete(id);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return res.json({
      satus: "success",
      message: "User deleted successfully",
      data: { id: user.id },
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new CustomError(error.message, 500));
    }

    throw new CustomError("Internal Server Error", 500);
  }
};
