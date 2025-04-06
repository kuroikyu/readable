import { FC } from "react";
import { Link, Location, Navigate, Outlet, useLocation } from "react-router";

import { useAppSelector } from "@/store/hooks";

function stateHasNextRoute(
  maybe: unknown,
): maybe is { nextRoute: Omit<Location, "state"> } {
  return (
    !!maybe &&
    typeof maybe === "object" &&
    "nextRoute" in maybe &&
    !!maybe.nextRoute &&
    typeof maybe.nextRoute === "object" &&
    "pathname" in maybe.nextRoute &&
    typeof maybe.nextRoute.pathname === "string" &&
    !!maybe.nextRoute.pathname &&
    "search" in maybe.nextRoute
  );
}

const AuthLayout: FC = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const { state } = useLocation();

  if (isAuthenticated && !loading && state && stateHasNextRoute(state)) {
    return (
      <Navigate
        to={`${state.nextRoute.pathname}${state.nextRoute.search || ""}`}
        state={null}
        replace
      />
    );
  }

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
