import UserForm from '../../components/user/user-form.component';

const AdminAddUser = () => {
  return (
    <div>
      <UserForm user={null} action='Create' account_type='User' />
    </div>
  );
};

export default AdminAddUser;
