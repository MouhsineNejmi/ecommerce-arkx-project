import { getServerSession } from "next-auth";

import authOptions from "@/auth.config";

const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session;
};

export default getUserSession;
