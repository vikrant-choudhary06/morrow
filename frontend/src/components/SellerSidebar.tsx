import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../Storee/hooks";
import { logout } from "../Storee/slices/authSlice";
import Api from "../service/Api";

type SellerSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const SellerSidebar = ({ isOpen = false, onClose }: SellerSidebarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user) as {
    name?: string;
  } | null;

  const navItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: "▣",
    },
    {
      name: "My Listings",
      path: "/mylistings",
      icon: "▤",
    },
    {
      name: "Add a listing",
      path: "/listings/add",
      icon: "+",
    },
  ];

  const handleLogout = async () => {
    try {
      await Api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[#FCFAF6] px-5 py-7 transition-transform duration-300 md:relative md:w-60 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with Logo and Mobile Close Button */}
        <div className="mb-10 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <span className="h-3.5 w-3.5 rounded-full bg-[var(--terracotta)]" />
            <span className="font-serif text-2xl font-semibold tracking-tight text-[var(--primary)]">
              morrow
            </span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-2xl text-[var(--muted)] hover:text-[var(--dark)] md:hidden"
            >
              ×
            </button>
          )}
        </div>

        {/* YOUR SPACE */}
        <div>
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
            Your Space
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-[#E6EDE5] font-semibold text-[var(--primary)]"
                      : "text-[var(--text)] hover:bg-[#F0ECE5]"
                  }`
                }
              >
                <span className="w-5 text-center text-sm">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* ACCOUNT */}
        <div className="mt-auto">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
            Account
          </p>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[var(--text)] transition hover:bg-[#F0ECE5]"
          >
            <span className="w-5 text-center">↪</span>
            <span>Logout</span>
          </button>

          {/* USER CARD */}
          <div className="mt-4 rounded-xl bg-[#F0ECE5] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCCFB7] text-sm font-semibold text-[var(--primary)]">
                {user?.name?.charAt(0).toUpperCase() || "S"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-[var(--primary)]">
                  {user?.name || "Seller"}
                </p>

                <p className="text-[10px] text-[var(--muted)]">Seller Account</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SellerSidebar;