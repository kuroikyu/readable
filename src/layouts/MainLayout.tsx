import { FC } from "react";
import { Outlet } from "react-router";

import Navbar from "@/components/Navbar";


const MainLayout: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
