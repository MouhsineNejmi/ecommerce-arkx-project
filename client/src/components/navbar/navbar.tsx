import Link from "next/link";

import Container from "@/components/ui/container";
import MainNav from "@/components/navbar/main-nav";
import NavbarActions from "@/components/navbar/navbar-actions";
import SignInButton from "@/components/sign-in-button";

import { getCategories } from "@/actions/categories/queries";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex ml-4 lg:ml-0 gap-x-2">
            <p className="text-xl font-bold">ARKX FINAL STORE</p>
          </Link>

          <MainNav data={categories} />

          <div className="w-auto flex items-center gap-2">
            <SignInButton />
            <NavbarActions />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
