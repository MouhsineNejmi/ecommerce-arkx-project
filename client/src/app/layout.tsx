import React from "react";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Providers from "@/providers";

import "./globals.css";

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
      <body>
        <Providers>
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
