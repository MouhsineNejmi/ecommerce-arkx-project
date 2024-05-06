import { genSalt, hashSync } from "bcryptjs";

import { SIGNUP_USER } from "@/graphql/users/users.mutation";
import { SignupUserInput } from "@/types/auth.types";
import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  const body: SignupUserInput = await req.json();
  const salt = await genSalt(12);

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_HASURA_ENDPOINT as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env
          .NEXT_PUBLIC_HASURA_ADMIN_SECRET_KEY as string,
      },
      body: JSON.stringify({
        query: SIGNUP_USER,
        variables: {
          object: { ...body, password: hashSync(body?.password, salt) },
        },
      }),
    });
    const data = await res.json();

    return NextResponse.json({ user: data });
  } catch (error) {
    console.log(error);
  }
};

export { handler as POST };
