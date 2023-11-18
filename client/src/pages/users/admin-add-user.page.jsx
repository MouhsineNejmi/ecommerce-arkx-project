import UserForm from '../../components/user/user-form.component';

const AdminAddUser = () => {
  return (
    <div>
      <UserForm user={null} action='Create' />
    </div>
  );
};

export default AdminAddUser;
