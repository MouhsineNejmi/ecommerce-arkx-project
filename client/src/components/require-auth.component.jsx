/* eslint-disable react/prop-types */
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { useGetMyProfileDataQuery } from '../app/api/user.api';

const RequireAuth = ({ allowedRoles }) => {
  const [cookies] = useCookies(['logged_in']);

  const { data: user, isLoading, isFetching } = useGetMyProfileDataQuery();

  const loading = isLoading || isFetching;

  if (loading) {
    return <Loader2 />;
  }

  return (cookies.logged_in || user) && allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to='/unauthorized' />
  ) : (
    <Navigate to='/admin/login' />
  );
};

export default RequireAuth;
