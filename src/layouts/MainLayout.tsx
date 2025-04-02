import { FC } from "react";
import { Outlet } from "react-router";

import Navbar from "@/components/Navbar";

const MainLayout: FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-grow px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
