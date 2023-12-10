/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';

import { AlertDialog, AlertDialogTrigger } from './alert-dialog';

import DeleteUserDialog from '../user/delete-user-dialog.component';
import UserDialog from '../shared/user-dialog.component';
import { isAccountTypeUser } from '../../helpers/isAccountTypeUser';

import { useGetUserByIdQuery } from '../../app/api/users.api';
import { useGetCustomerByIdQuery } from '../../app/api/customers.api';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

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
        trigger={<PencilIcon className='w-6 h-6 cursor-pointer mr-2' />}
        user={user}
        account_type='User'
        action='Update'
      />

      <AlertDialog>
        <AlertDialogTrigger className='w-full flex text-red-500'>
          <TrashIcon className='w-5 h-5 mr-2' />
        </AlertDialogTrigger>

        <DeleteUserDialog userId={id} />
      </AlertDialog>
    </div>
  ) : (
    <UserDialog
      trigger={<PencilIcon className='w-5 h-5 cursor-pointer mr-2' />}
      user={customer}
      account_type='Customer'
      action='Update'
    />
  );
}

export default DataTableRowActions;
