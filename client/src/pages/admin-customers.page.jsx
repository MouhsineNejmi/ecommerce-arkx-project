import { useEffect } from 'react';

import { useToast } from '../components/ui/use-toast';
import { useGetAllCustomersQuery } from '../app/api/customers.api';

import { Button } from '../components/ui/button';
import getColumns from '../components/ui/columns';
import DataTable from '../components/ui/data-table';

import UserDialog from '../components/shared/user-dialog.component';

const AdminCustomers = () => {
  const { toast } = useToast();
  const {
    data: customers,
    isLoading,
    isError,
    error,
  } = useGetAllCustomersQuery();
  console.log(customers);

  const columns = getColumns({
    keyOne: '_id',
    keyOneTitle: 'Customer Id',
    keyTwo: 'email',
    keyTwoTitle: 'Email Address',
    keyThree: 'valid_account',
    keyThreeTitle: 'Valid Account',
    keyFour: 'active',
    keyFourTitle: 'Active/Inactive',
    keyFive: 'creation_date',
    keyFiveTitle: 'Created At',
    option: 'customers',
  });

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error).data.error) {
        error.data.error.forEach((el) =>
          toast({ title: el.message, variant: 'destructive' })
        );
      } else {
        toast({ title: error.data.message, variant: 'destructive' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div>
      <div className='flex items-center justify-between mb-5'>
        <h1>Customers</h1>
        <UserDialog
          trigger={
            <Button className='bg-main-1 p-2 rounded-2xl text-white hover:bg-main-2 px-4'>
              Add Customer
            </Button>
          }
          action='Create'
          account_type='Customer'
        />
      </div>

      {customers && (
        <DataTable
          data={customers}
          columns={columns}
          option={'customers'}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AdminCustomers;
