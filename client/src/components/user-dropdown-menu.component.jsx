import * as React from 'react';
import { CreditCard, LogOut, Settings, User } from 'lucide-react';
import { useSelector } from 'react-redux';

import { useToast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../app/api/auth.api';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const UserDropDownMenu = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userSlice.user);
  const [logoutUser, { isLoading, isError, error, isSuccess }] =
    useLogoutUserMutation();

  const handleLogout = async () => {
    console.log('isLoading', isLoading);
    logoutUser();
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'User Logged out Successfully!',
      });
      navigate('/admin/login');
    }

    if (isError) {
      if (Array.isArray(error).data.error) {
        error.data.error.forEach((el) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error(error.data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='cursor-pointer'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-48'>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className='mr-2 h-4 w-4' />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
};

export default UserDropDownMenu;
