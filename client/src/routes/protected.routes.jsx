import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../app/features/auth/authSlice"

const ProtectedRoutes = () => {
  const token = useSelector(selectCurrentToken)
  
  return (
    token
        ? <Outlet />
        : <Navigate to="/admin/login" />
  )
};

export default ProtectedRoutes;
