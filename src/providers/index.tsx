import { Toaster } from "@/components/ui/toaster";
import ApolloClientProvider from "./apollo-client";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloClientProvider>
      {children}
      <Toaster />
    </ApolloClientProvider>
  );
};

export default Providers;
