import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";
import { User } from "@prisma/client";

interface JwtOptions {
  expiresIn: string;
}

export const signJwt = (payload: JwtPayload, options: JwtOptions) => {
  try {
    return jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET_KEY as string,
      options
    );
  } catch (error) {
    return null;
  }
};

export const verifyJwt = (token: string): JwtPayload | string => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY as string);
};

export const signToken = async (user: User) => {
  const access_token = signJwt(
    { sub: user.id },
    {
      expiresIn: "1d",
    }
  );

  return { access_token };
};
