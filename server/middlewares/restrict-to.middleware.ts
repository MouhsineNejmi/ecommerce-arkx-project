import { Request, Response, NextFunction } from "express";

import CustomError from "../utils/custom-error";

type AllowedRoles = "admin" | "manager";

export const restrictTo =
  (...allowedRoles: AllowedRoles[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!allowedRoles.includes(user.role)) {
      return next(
        new CustomError("You are not allowed to perform this action", 403)
      );
    }

    next();
  };

export const restrictToCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (user.account_type !== "customer") {
    return next(
      new CustomError("You are not allowed to perform this action", 403)
    );
  }

  next();
};
