"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";

import {
  GET_USER_CURRENT_STORE,
  GET_USER_STORES,
} from "@/graphql/store/store.query";

export const useUserStores = () => {
  const { data: session } = useSession();

  const { data: storesData, loading } = useQuery(GET_USER_STORES, {
    variables: {
      where: {
        user_id: { _eq: session?.user?.id },
      },
      order_by: {
        created_at: "asc",
      },
    },
  });

  const stores = storesData?.store;

  return { stores, loading };
};

export const useUserCurrentStore = ({ storeId }: { storeId: string }) => {
  const { data: session } = useSession();

  const { data: storeData, loading } = useQuery(GET_USER_CURRENT_STORE, {
    variables: {
      where: { id: { _eq: storeId }, user_id: { _eq: session?.user?.id } },
    },
  });

  const store = storeData?.store[0];

  return { store, loading };
};
