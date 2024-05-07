"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";

import UserMenu from "@/components/shared/user-menu";
import StoreSwitcher from "@/components/office/store-switcher";
import { GET_USER_STORES } from "@/graphql/store/store.query";
// import { ThemeToggle } from '@/components/theme-toggle';

const Navbar = () => {
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

  return (
    <div className="border-b md:ml-60">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher items={stores} />
        <div className="flex items-center ml-auto space-x-4">
          {/* <ThemeToggle /> */}
          <UserMenu currentUser={session?.user} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
