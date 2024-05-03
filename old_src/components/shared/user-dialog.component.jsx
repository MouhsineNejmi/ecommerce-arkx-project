/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import UserForm from './user-form.component';

const UserDialog = ({ user, account_type, action, trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px] h-[90%] overflow-y-scroll'>
        <DialogTitle>
          {action} {account_type}
        </DialogTitle>
        <UserForm user={user} action={action} account_type={account_type} />
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
