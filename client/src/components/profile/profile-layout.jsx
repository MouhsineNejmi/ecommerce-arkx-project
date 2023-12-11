import { Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useGetMyProfileDataQuery } from '../../app/api/users.api';

import ProfileSidebar from './profile-sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const profileSidebarItems = [
  {
    title: 'Profile',
    to: '/profile',
  },
  {
    title: 'Orders',
    to: '/profile/orders',
  },
  {
    title: 'Wishlist',
    to: '/profile/favorites',
  },
];

const ProfileLayout = () => {
  const { data: customer, isLoading } = useGetMyProfileDataQuery();

  return (
    <div className='custom-container'>
      <div className='pb-32'>
        <h2 className='flex justify-center text-4xl underline font-bold tracking-tight mt-10 mb-20'>
          My Account
        </h2>

        <div className='flex gap-20'>
          <aside className='bg-muted p-4 rounded-lg lg:w-1/5'>
            {isLoading ? (
              <Loader2 className='animate-spin' />
            ) : (
              <div className='flex flex-col items-center mb-8'>
                <Avatar className='w-28 h-28'>
                  <AvatarImage src={customer.profile_image} />
                  <AvatarFallback>{customer.username}</AvatarFallback>
                </Avatar>
                <h4 className='font-semibold mt-2'>{customer.username}</h4>
              </div>
            )}
            <ProfileSidebar items={profileSidebarItems} />
          </aside>
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
