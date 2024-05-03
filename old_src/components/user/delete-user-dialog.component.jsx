/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { useDeleteUserMutation } from '../../app/api/users.api';

import { useToast } from '../ui/use-toast';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

const DeleteUserDialog = ({ userId }) => {
  const { toast } = useToast();
  const [deleteUser, { isLoading, isError, error, isSuccess }] =
    useDeleteUserMutation();

  const handleDelete = () => deleteUser(userId);

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error).data.error) {
        error.data.error.forEach((el) =>
          toast({
            title: el.message,
            variant: 'destructive',
          })
        );
      } else {
        toast({ title: error.data.message, variant: 'destructive' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast({ title: 'User deleted Successfully!' });
    }
  });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this user
          account and remove his data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          disabled={isLoading}
          className='bg-destructive'
          onClick={handleDelete}
        >
          {isLoading && <Loader2 className='animate-spin' />}
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteUserDialog;
