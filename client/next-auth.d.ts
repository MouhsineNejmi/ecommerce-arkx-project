/* eslint-disable no-unused-vars */
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token: string;
    user: {
      id: string;
      username: string;
      email: string;
      profile: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    user: {
      id: string;
      username: string;
      email: string;
      profile: string;
      role: string;
    };
  }
}
