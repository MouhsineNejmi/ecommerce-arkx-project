import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import Providers from "@/providers";

import "./globals.css";

const fontSans = FontSans({
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
      <body className={fontSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
