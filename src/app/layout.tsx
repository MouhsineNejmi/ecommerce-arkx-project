import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import Providers from "@/providers";

import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";

import "./globals.css";

const font = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Arkx Final",
  description: "Created by Mouhsine NEJMI as a the final test in our bootcamp.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
