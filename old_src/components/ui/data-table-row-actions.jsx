/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

import { AlertDialog, AlertDialogTrigger } from './alert-dialog';

import DeleteUserDialog from '../user/delete-user-dialog.component';
import UserDialog from '../shared/user-dialog.component';
import { isAccountTypeUser } from '../../helpers/isAccountTypeUser';

import { useGetUserByIdQuery } from '../../app/api/users.api';
import { useGetCustomerByIdQuery } from '../../app/api/customers.api';

function DataTableRowActions({ row, option }) {
  const { _id: id, account_type } = row.original;

  const isUser = isAccountTypeUser(account_type);
  const userId = isUser ? id : null;
  const customerId = !isUser ? id : null;

  const { data: user } = useGetUserByIdQuery(userId, { skip: !isUser });
  const { data: customer } = useGetCustomerByIdQuery(customerId, {
    skip: isUser,
  });

  return option === 'users' ? (
    <div className='flex gap-2 items-center'>
      <UserDialog
        trigger={<Edit2 size={18} className='cursor-pointer mr-2' />}
        user={user}
        account_type='User'
        action='Update'
      />

      <AlertDialog>
        <AlertDialogTrigger className='w-full flex'>
          <Trash2 size={16} className='mr-2 color-red-400' />
        </AlertDialogTrigger>

        <DeleteUserDialog userId={id} />
      </AlertDialog>
    </div>
  ) : (
    <UserDialog
      trigger={<Edit2 size={14} className='cursor-pointer mr-2' />}
      user={customer}
      account_type='Customer'
      action='Update'
    />
  );
}

export default DataTableRowActions;
