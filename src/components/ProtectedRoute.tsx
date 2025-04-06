import { FC, PropsWithChildren, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookStatsByUser } from "@/store/feature/books/bookStatsSlice";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const authToken = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      dispatch(fetchBookStatsByUser({ userId: user.id, authToken }));
    }
  }, [dispatch, user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ nextRoute: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
