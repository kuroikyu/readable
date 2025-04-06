import { FC } from "react";
import { Link, Navigate, Outlet } from "react-router";

import { useAppSelector } from "@/store/hooks";

const AuthLayout: FC = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (isAuthenticated && !loading) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="from-brand-secondary-100 to-brand-primary-100 flex min-h-screen flex-col items-center justify-center gap-8 bg-linear-to-br px-4">
      <Link to="/">
        <img
          src="/readable.svg"
          alt="readable"
          aria-label="home"
          className="h-12"
        />
      </Link>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
