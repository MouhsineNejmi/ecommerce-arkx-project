import UserForm from '../../components/user/user-form.component';

const AdminAddCustomer = () => {
  return (
    <div>
      <UserForm user={null} action='Create' account_type='Customer' />
    </div>
  );
};

export default AdminAddCustomer;
