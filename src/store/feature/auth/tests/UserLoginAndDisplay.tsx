import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "../authSlice";

export default function UserDisplay() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);

  return (
    <div>
      {/* Display the current user name */}
      <div>{user?.id}</div>
      {/* On button click, dispatch a thunk action to fetch a user */}
      <button
        onClick={() =>
          dispatch(loginUser({ userId: "test", password: "environment" }))
        }
      ></button>
      {/* At any point if we're fetching a user, display that on the UI */}
      {loading && <div>Fetching user...</div>}
    </div>
  );
}
