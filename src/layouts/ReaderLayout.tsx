import { FC } from "react";
import { Outlet } from "react-router";

import ProtectedRoute from "@/components/ProtectedRoute";

const ReaderLayout: FC = () => {
  return (
    <ProtectedRoute>
      <main className="from-brand-secondary-50 to-brand-primary-50 min-h-screen bg-gradient-to-br">
        <Outlet />
      </main>
    </ProtectedRoute>
  );
};

export default ReaderLayout;
