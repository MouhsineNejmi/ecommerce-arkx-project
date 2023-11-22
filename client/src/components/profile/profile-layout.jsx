/* eslint-disable react/prop-types */
import { Separator } from '../ui/separator';
import ProfileSidebar from './profile-sidebar';

const profileSidebarItems = [
  {
    title: 'Profile',
    link: '/profile',
  },
  {
    title: 'Orders',
    to: '/profile/orders',
  },
  {
    title: 'Wishlist',
    to: '/profile/favorites',
  },
  {
    title: 'Cart',
    to: '/profile/cart',
  },
];

const ProfileLayout = ({ children }) => {
  return (
    <div>
      <div className='hidden space-y-6 p-10 pb-16 md:block'>
        <h2 className='flex justify-center text-2xl font-bold tracking-tight'>
          Settings
        </h2>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <ProfileSidebar items={profileSidebarItems} />
          </aside>
          <div className='flex-1 lg:max-w-2xl'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
