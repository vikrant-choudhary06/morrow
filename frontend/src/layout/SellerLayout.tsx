import { useState } from "react";
import { Outlet } from "react-router";
import SellerSidebar from "../components/SellerSidebar";

const SellerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar with Drawer on Mobile */}
      <SellerSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="flex h-14 items-center justify-between border-b border-[var(--border)] bg-[#FCFAF6] px-4 md:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-2 text-[var(--dark)] hover:bg-[#F0ECE5]"
              aria-label="Open navigation"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <span className="font-serif text-lg font-semibold text-[var(--primary)]">
              Morrow Seller
            </span>
          </div>
        </header>

        {/* Nested Seller Routes */}
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;