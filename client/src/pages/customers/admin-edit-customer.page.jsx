import { useParams } from 'react-router-dom';

import { useGetCustomerByIdQuery } from '../../app/api/customers.api';

import UserForm from '../../components/shared/user-form.component';
import { Loader2 } from 'lucide-react';

const AdminEditCustomer = () => {
  const { customerId } = useParams();
  const { data: customer, isLoading } = useGetCustomerByIdQuery(customerId);

  return (
    <div className='grid gap-8'>
      <h1 className='text-xl font-bold'>Customer Profile</h1>
      {isLoading ? (
        <Loader2 className='animate-spin' />
      ) : (
        <UserForm user={customer} action='Update' account_type='Customer' />
      )}
    </div>
  );
};

export default AdminEditCustomer;
