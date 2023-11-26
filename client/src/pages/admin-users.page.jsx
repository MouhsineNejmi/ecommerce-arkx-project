import { useEffect } from 'react';

import { useToast } from '../components/ui/use-toast';
import { useGetAllUsersQuery } from '../app/api/users.api';

import { Button } from '../components/ui/button';
import getColumns from '../components/ui/columns';
import DataTable from '../components/ui/data-table';
import UserDialog from '../components/shared/user-dialog.component';

const AdminUsers = () => {
  const { toast } = useToast();
  const { data: users, isLoading, isError, error } = useGetAllUsersQuery();

  const columns = getColumns({
    keyOne: '_id',
    keyOneTitle: 'User Id ',
    keyTwo: 'email',
    keyTwoTitle: 'Email Address',
    keyThree: 'role',
    keyThreeTitle: 'Role',
    keyFour: 'active',
    keyFourTitle: 'Active/Inactive',
    keyFive: 'creation_date',
    keyFiveTitle: 'Created At',
    option: 'users',
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: error?.data.message || 'Something went wrong please try again!',
        variant: 'destructive',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div>
      <div className='flex items-center justify-between mb-5'>
        <h1>Users</h1>
        <UserDialog
          trigger={
            <Button className='bg-gold p-2 rounded-2xl text-white hover:bg-light-gold px-4'>
              Add User
            </Button>
          }
          action='Create'
          account_type='User'
        />
      </div>

      {users && (
        <DataTable
          data={users}
          columns={columns}
          option={'users'}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AdminUsers;
