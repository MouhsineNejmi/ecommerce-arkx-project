import { genSalt, hash } from "bcryptjs";

import { SIGNUP_USER } from "@/graphql/users/users.mutation";
import { SignupUserInput } from "@/types/auth.types";
import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  const body: SignupUserInput = await req.json();
  const salt = await genSalt(12);

  try {
    const hashedPassword = await hash(body?.password, salt);

    const res = await fetch(
      process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env
            .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
        },
        body: JSON.stringify({
          query: SIGNUP_USER,
          variables: {
            object: { ...body, password: hashedPassword },
          },
        }),
      }
    );
    const data = await res.json();

    return NextResponse.json({ user: data });
  } catch (error) {
    console.log(error);
  }
};

export { handler as POST };
