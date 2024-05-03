"use client";

import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT as string,
    headers: {
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET_KEY as string,
    },
  }),
  cache: new InMemoryCache(),
});

type Props = {
  children: React.ReactNode;
};

const ApolloClientProvider: React.FC<Props> = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
