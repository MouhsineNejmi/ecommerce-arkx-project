import UserMenu from "@/components/shared/user-menu";
// import { ThemeToggle } from "@/components/theme-toggle";

import { Session } from "next-auth";

interface NavbarProps {
  currentUser: Session["user"];
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="border-b md:ml-60">
      <div className="flex items-center h-16 px-4">
        <div className="flex items-center ml-auto space-x-4">
          {/* <ThemeToggle /> */}
          <UserMenu currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
