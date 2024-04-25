import { CookieOptions, NextFunction, Request, Response } from "express";
import { genSalt, hash, compare } from "bcryptjs";

import * as UserService from "../services/user.service";

import CustomError from "../utils/custom-error";
import { signToken } from "../utils/jwt";
import { UserLogin } from "../dto/user.dto";

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() * 86400 * 1000),
  maxAge: 86400 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

if (process.env.NODE_ENV === "production")
  accessTokenCookieOptions.secure = true;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  try {
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    const newUser = await UserService.createUser({
      ...req.body,
      password: hashedPassword,
      active: true,
    });

    return res.json({
      status: "success",
      message: "User created successfully",
      data: { user: newUser },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = <UserLogin>req.body;

  try {
    const user = await UserService.findUserByEmail(email);

    // Check if user exist and password is correct
    if (!user || !compare(user.password, req.body.password)) {
      return next(new CustomError("Invalid username or password", 401));
    }

    // Create an Access Token
    const { access_token } = await signToken(user);

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return res.status(200).json({
      status: "success",
      data: user,
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSession = (res: Response) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("logged_in", "", {
    maxAge: 1,
  });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    deleteSession(res);

    return res.status(200).json({
      status: "success",
      message: "You logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};
