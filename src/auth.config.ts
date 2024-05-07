import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import * as jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

const authOptions: NextAuthOptions = {
  adapter: HasuraAdapter({
    endpoint: process.env.NEXT_PUBLIC_NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT!,
    adminSecret: process.env.NEXT_PUBLIC_NEXT_PUBLIC_HASURA_ADMIN_SECRET!,
  }),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
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
                query: `
                  query GetUserByEmail($where: user_bool_exp) {
                    user(where: $where) {
                      id
                      email
                      role
                      password
                    }
                  }
                `,
                variables: {
                  where: { email: { _eq: credentials?.email } },
                },
              }),
            }
          );

          const { data } = await res.json();

          if (
            data.user &&
            (await compare(
              credentials?.password as string,
              data?.user[0].password
            ))
          ) {
            return data.user[0];
          } else {
            throw new Error("Invalid credentials!");
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jwt.sign(token!, secret as string, {
        algorithm: "HS256",
      });
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jwt.verify(token!, secret as string, {
        algorithms: ["HS256"],
      });
      return decodedToken as JWT;
    },
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }

      if (token.role && session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
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
            query: `
              query GetUserById($id: uuid!) {
                user_by_pk(id: $id) {
                  email
                  role
                }
              }
            `,
            variables: {
              id: token.sub,
            },
          }),
        }
      );

      const { data } = await res.json();

      const existingUser = data.user_by_pk;

      token.role = existingUser.role;

      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
} satisfies NextAuthOptions;

export default authOptions;
