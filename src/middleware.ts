import { withAuth } from "next-auth/middleware";
export { default } from "next-auth/middleware";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export default withAuth({
//   jwt: { decode: authOptions.jwt?.decode },
//   callbacks: {
//     authorized: ({ token }) => {
//       console.log("MIDDLEWARE TOKEN: ", token);

//       return token?.role === "admin";
//     },
//   },
// });

export const config = { matcher: ["/office/:path*"] };
