import { Loader2 } from 'lucide-react';
import { useGetMyProfileDataQuery } from '../../app/api/users.api';
import UserForm from '../../components/shared/user-form.component';

const CustomerProfile = () => {
  const { data: customer, isLoading } = useGetMyProfileDataQuery();

  return (
    <>
      {isLoading ? (
        <Loader2 className='animate-spin' />
      ) : (
        <UserForm user={customer} action={'Edit'} account_type='Customer' />
      )}
    </>
  );
};

export default CustomerProfile;
