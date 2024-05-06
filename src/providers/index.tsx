"use client";

import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/toaster";

import ApolloClientProvider from "./apollo-client";
import ModalProvider from "./modal-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ApolloClientProvider>
        {children}
        <ModalProvider />
        <Toaster />
      </ApolloClientProvider>
    </SessionProvider>
  );
};

export default Providers;
