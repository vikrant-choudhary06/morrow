
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      
      <Navbar />

      <main className="min-h-[calc(100vh-72px)] w-full">
        <Outlet />
      </main>

    </div>
  );
};

export default PublicLayout;