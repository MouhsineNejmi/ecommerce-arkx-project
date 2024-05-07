import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import authOptions from "@/auth.config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ecommerce Arkx Final - Office",
  description: "Created by Mouhsine NEJMI as a the final test in our bootcamp.",
};

export default async function OfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "customer") {
    // To Display an unathorized page
    redirect("/login");
  }

  return <main>{children}</main>;
}
