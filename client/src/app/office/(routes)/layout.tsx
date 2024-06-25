import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Poppins as FontSans } from "next/font/google";

import Sidebar from "@/components/office/sidebar";
import Navbar from "@/components/office/navbar";

import getUserSession from "@/actions/get-user-session";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ecommerce Arkx Final - Office",
  description: "Created by Mouhsine NEJMI as a the final test in our bootcamp.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function OfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  console.log("SESSION: ", session);

  if (!session?.user) {
    // Not authenticated
    redirect("/api/auth/signin");
  }

  if (session?.user?.role !== "admin") {
    // To Do: Display an unathorized page (only admin can access this page)
    redirect("/");
  }

  return (
    <main>
      <Navbar currentUser={session.user} />
      <Sidebar />
      <div className={cn("md:ml-60 p-4", fontSans.className)}>{children}</div>
    </main>
  );
}
