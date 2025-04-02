import { FC } from "react";
import { Navigate, Outlet } from "react-router";

import { useAppSelector } from "@/store/hooks";


const AuthLayout: FC = () => {
  const { isAuthenticated, loading } = useAppSelector(state => state.auth)

  if (isAuthenticated && !loading) {
    return <Navigate to="/" replace />
  }
  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Outlet />
    </div>
  )
}


export default AuthLayout
