import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/office/sidebar";
import Navbar from "@/components/office/navbar";
import authOptions from "@/auth.config";
import { GET_STORE_BY_ID } from "@/graphql/store/store.query";

export const metadata: Metadata = {
  title: "Ecommerce Arkx Final - Office",
  description: "Created by Mouhsine NEJMI as a the final test in our bootcamp.",
};

export default async function OfficeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { storeId } = params;
  const session = await getServerSession(authOptions);

  if (!session?.user || session?.user?.role === "customer" || !storeId) {
    // To Do: Display an unathorized page
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env
          .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: GET_STORE_BY_ID,
        variables: { id: storeId },
      }),
    }
  );

  const { data } = await res.json();

  if (!data.store_by_pk) {
    redirect("/");
  }

  return (
    <main>
      <Navbar />
      <Sidebar />
      <div className="md:ml-60 p-4">{children}</div>
    </main>
  );
}
