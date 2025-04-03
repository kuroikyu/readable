import { FC } from "react";
import { Outlet } from "react-router";

const ReaderLayout: FC = () => {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
};

export default ReaderLayout;
