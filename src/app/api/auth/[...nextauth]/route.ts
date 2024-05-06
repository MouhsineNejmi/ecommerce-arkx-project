import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import * as jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
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
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_HASURA_ENDPOINT as string,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": process.env
                  .NEXT_PUBLIC_HASURA_ADMIN_SECRET_KEY as string,
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
            (await compare(credentials.password, data?.user[0].password))
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
  adapter: HasuraAdapter({
    endpoint: process.env.NEXT_PUBLIC_HASURA_ENDPOINT!,
    adminSecret: process.env.HASURA_ADMIN_SECRET_KEY!,
  }),
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  // Use JWT strategy so we can forward them to Hasura
  session: { strategy: "jwt" },
  // Encode and decode your JWT with the HS256 algorithm
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jwt.sign(token!, secret, {
        algorithm: "HS256",
      });
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jwt.verify(token!, secret, {
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
        process.env.NEXT_PUBLIC_HASURA_ENDPOINT as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": process.env
              .NEXT_PUBLIC_HASURA_ADMIN_SECRET_KEY as string,
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
