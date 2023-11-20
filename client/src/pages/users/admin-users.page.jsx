import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useToast } from '../../components/ui/use-toast';
import { useGetAllUsersQuery } from '../../app/api/users.api';

import getColumns from '../../components/ui/columns';
import DataTable from '../../components/ui/data-table';

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
        <h1>Users</h1>
        <Link
          to='/admin/users/add'
          className='bg-main-1 p-2 rounded-2xl text-white hover:bg-main-2 px-4'
        >
          AddUser
        </Link>
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
