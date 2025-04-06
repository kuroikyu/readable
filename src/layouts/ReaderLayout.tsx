import { FC } from "react";
import { Outlet } from "react-router";

const ReaderLayout: FC = () => {
  return (
    <main className="from-brand-secondary-50 to-brand-primary-50 min-h-screen bg-gradient-to-br">
      <Outlet />
    </main>
  );
};

export default ReaderLayout;
