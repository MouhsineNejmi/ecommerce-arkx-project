import UserForm from '../../components/shared/user-form.component';

const AdminAddCustomer = () => {
  return (
    <div>
      <UserForm user={null} action='Create' account_type='Customer' />
    </div>
  );
};

export default AdminAddCustomer;
