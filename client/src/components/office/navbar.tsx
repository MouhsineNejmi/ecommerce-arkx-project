"use client";

import { useSession } from "next-auth/react";

import UserMenu from "@/components/shared/user-menu";
import StoreSwitcher from "@/components/office/store-switcher";
// import { ThemeToggle } from '@/components/theme-toggle';

import { useUserStores } from "@/hooks/use-user-stores";

const Navbar = () => {
  const { data: session } = useSession();
  const { stores, loading } = useUserStores();

  return (
    <div className="border-b md:ml-60">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher items={stores} loading={loading} />
        <div className="flex items-center ml-auto space-x-4">
          {/* <ThemeToggle /> */}
          <UserMenu currentUser={session?.user} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
