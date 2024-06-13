"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

import ApolloClientProvider from "@/providers/apollo-client";
import ModalProvider from "@/providers/modal-provider";

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
