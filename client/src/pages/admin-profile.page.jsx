import { Loader2 } from 'lucide-react';
import { useGetMyProfileDataQuery } from '../app/api/users.api';
import UserForm from '../components/shared/user-form.component';

const AdminProfile = () => {
  const { data: user, isLoading } = useGetMyProfileDataQuery();

  return isLoading ? (
    <Loader2 className='animate-spin' />
  ) : (
    <>
      <div className='flex justify-center items-center h-28'>
        <h2 className='font-bold text-[40px]'>My Profile</h2>
      </div>
      <UserForm user={user} action='Update' account_type='User' />
    </>
  );
};

export default AdminProfile;
