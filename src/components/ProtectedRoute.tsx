import { FC, ReactNode, useEffect } from "react";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookStatsByUser } from "@/store/bookStatsSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchBookStatsByUser(user.id));
    }
  }, [dispatch, user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
