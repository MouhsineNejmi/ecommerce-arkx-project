"use client";

import { Toaster } from "@/components/ui/toaster";

import ApolloClientProvider from "@/providers/apollo-client";
import ModalProvider from "@/providers/modal-provider";

import authOptions from "@/auth.config";
import { SessionProvider } from "next-auth/react";

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
