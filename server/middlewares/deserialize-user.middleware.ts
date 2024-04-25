import { Request, Response, NextFunction } from "express";

import * as UserService from "../services/user.service";
import { verifyJwt } from "../utils/jwt";
import CustomError from "../utils/custom-error";
import { decode } from "jsonwebtoken";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new CustomError("You are not logged in", 401));
    }

    const decoded = verifyJwt(access_token);

    if (!decoded) {
      return next(new CustomError("Invalid token or user doesn't exist", 401));
    }

    if (decoded.sub) {
      const user = await UserService.findUserById(decoded.sub as string);

      if (!user) {
        return next(
          new CustomError("User with that token no longer exist", 401)
        );
      }

      res.locals.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default deserializeUser;
