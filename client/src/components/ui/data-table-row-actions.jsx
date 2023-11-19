/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { AlertDialog, AlertDialogTrigger } from './alert-dialog';

import DeleteUserDialog from '../user/delete-user-dialog.component';

function DataTableRowActions({ row }) {
  const navigate = useNavigate();
  // const [deleteUser, {isLoading}] = useDeleteUserMutation();
  const userId = row.original._id;

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal size={18} className='cursor-pointer' />
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-56 bg-background p-2 z-10'>
          <DropdownMenuItem
            className='w-full'
            onClick={() => navigate(`/admin/users/edit/${userId}`)}
          >
            <Pencil className='mr-2 h-4 w-4' />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className='w-full text-red-500 focus:bg-red-100 focus:text-red-500'>
            <AlertDialogTrigger className='w-full flex'>
              <Trash2 className='mr-2 h-4 w-4' />
              <span>Delete</span>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs */}
      <DeleteUserDialog userId={userId} />
    </AlertDialog>
  );
}

export default DataTableRowActions;
