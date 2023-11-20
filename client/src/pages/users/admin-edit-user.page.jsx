import { useParams } from 'react-router-dom';

import { useGetUserByIdQuery } from '../../app/api/users.api';

import UserForm from '../../components/shared/user-form.component';
import { Loader2 } from 'lucide-react';

const AdminEditUser = () => {
  const { userId } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);

  return (
    <div className='grid gap-8'>
      <h1 className='text-xl font-bold'>User Profile</h1>
      {isLoading ? (
        <Loader2 className='animate-spin' />
      ) : (
        <UserForm user={user} action='Update' account_type='User' />
      )}
    </div>
  );
};

export default AdminEditUser;
