"use client";

import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <main>
      <h1>Hello App</h1>
    </main>
  );
};

export default Page;
