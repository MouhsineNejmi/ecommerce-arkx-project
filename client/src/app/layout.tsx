import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce Application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Ecommerce</title>
        <meta name="description" content="Ecommerce Application" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
