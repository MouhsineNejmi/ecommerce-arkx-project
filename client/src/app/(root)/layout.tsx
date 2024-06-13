import React from "react";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";

const font = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Arkx Final",
  description: "Created by Mouhsine NEJMI as a the final test in our bootcamp.",
};

export default async function FrontOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={font.className}>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
