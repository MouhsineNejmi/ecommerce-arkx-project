import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce Arkx Final - Office",
  description: "Created by Mouhsine NEJMI as a the final test in our bootcamp.",
};

export default function OfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
