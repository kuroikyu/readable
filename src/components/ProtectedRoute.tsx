import { FC, PropsWithChildren, useEffect } from "react";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookStatsByUser } from "@/store/feature/books/bookStatsSlice";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const authToken = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchBookStatsByUser({ userId: user.id, authToken }));
    }
  }, [dispatch, user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
