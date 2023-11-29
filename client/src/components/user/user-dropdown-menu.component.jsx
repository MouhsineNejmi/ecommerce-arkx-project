/* eslint-disable react/prop-types */
import * as React from 'react';
import { LogOut, Settings, User } from 'lucide-react';

import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../app/api/auth.api';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const UserDropDownMenu = ({ user }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [logoutUser, { isLoading, isError, error, isSuccess }] =
    useLogoutUserMutation();

  const handleLogout = () => {
    logoutUser();
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'User Logged out Successfully!',
      });
      user.account_type === 'User'
        ? navigate('/admin/login')
        : navigate('/auth');
    }

    if (isError) {
      toast({ title: error.data.message, variant: 'destructive' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar
            className={`cursor-pointer ${
              user.account_type === 'User' ? 'w-10 h-10' : 'w-8 h-8'
            }`}
          >
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-48'>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() =>
                user.account_type === 'User'
                  ? navigate('/admin/profile')
                  : navigate('/')
              }
            >
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
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
