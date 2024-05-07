"use client";

import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();

  return (
    <main>
      <h1>{JSON.stringify(session)}</h1>
    </main>
  );
};

export default Page;
