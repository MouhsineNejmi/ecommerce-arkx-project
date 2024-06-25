"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const SignInButton = () => {
  const { data: session } = useSession();

  console.log(session);

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        <p className="test-sky-600">{session.user.username}</p>
        <Link
          href="/api/auth/signout"
          className="flex gap-4 ml-auto text-red-600"
        >
          Sign Out
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-4 ml-auto items-center">
      <Link href="/signup" className="flex gap-4 ml-auto">
        Sign Up
      </Link>

      <Link
        href="/api/auth/signin"
        className="flex gap-4 ml-auto bg-black py-2 px-4 text-white"
      >
        Sign In
      </Link>
    </div>
  );
};

export default SignInButton;
