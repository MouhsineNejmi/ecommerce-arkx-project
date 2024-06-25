"use client";

import {
  //  useParams,
  useRouter,
} from "next/navigation";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";

// import { SessionUser } from "@/types";

interface UserMenuProps {
  currentUser?: Session["user"];
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();
  // const { storeId } = useParams();

  const logout = async () => {
    await signOut();
    router.push("/login");
  };

  if (!currentUser) {
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage
            src="https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
            alt="@user"
          />
          <AvatarFallback>RD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => router.push("/api/auth/signin")}>
          Login
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/signup")}>
          Signup
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src={currentUser?.profile} alt={currentUser?.username} />
          <AvatarFallback>
            {currentUser?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/office/profile")}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/office/settings")}>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
