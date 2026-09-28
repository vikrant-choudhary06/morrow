import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Api from "../../service/Api";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: {
    amount: number;
    currency: string;
  };
  stock: number;
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await Api.get("/products");
      setProducts(response.data?.data?.user?.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const activeProducts = products.filter((product) => product.stock > 0).length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* TOPBAR */}
      <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[#FCFAF6] px-4 sm:px-8">
        <p className="text-xs font-medium text-[var(--muted)]">
          My Space / Overview
        </p>

        <button
          onClick={() => navigate("/listings/add")}
          className="rounded-full bg-[var(--primary)] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[var(--primary-hover)] shadow-xs"
        >
          + Add a listing
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-7xl space-y-10">

          {/* GREETING */}
          <section>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Seller Dashboard
            </p>

            <h1 className="mt-2 font-serif text-3xl font-medium text-[var(--primary)] sm:text-4xl">
              Good morning, Seller
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Manage your listings and monitor inventory from here.
            </p>
          </section>

          {/* STATS */}
          <section className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {/* MY LISTINGS */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xs">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                My Listings
              </p>

              <h2 className="mt-3 font-serif text-4xl text-[var(--primary)]">
                {loading ? "..." : totalProducts}
              </h2>

              <p className="mt-2 text-xs text-[var(--muted)]">
                Total listings in your catalog
              </p>
            </div>

            {/* ACTIVE */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xs">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                Active
              </p>

              <h2 className="mt-3 font-serif text-4xl text-[var(--primary)]">
                {loading ? "..." : activeProducts}
              </h2>

              <p className="mt-2 text-xs text-[var(--muted)]">
                Currently available for sale
              </p>
            </div>

            {/* TOTAL PRODUCTS */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xs sm:col-span-2 md:col-span-1">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                Total In Stock
              </p>

              <h2 className="mt-3 font-serif text-4xl text-[var(--primary)]">
                {loading ? "..." : totalProducts}
              </h2>

              <p className="mt-2 text-xs text-[var(--muted)]">
                Products in your space
              </p>
            </div>
          </section>

          {/* QUICK ACTION */}
          <section>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Quick Action
            </p>

            <button
              onClick={() => navigate("/listings/add")}
              className="flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[#E9E6D9] p-6 text-left transition hover:bg-[#E2DFD2] shadow-2xs sm:p-7"
            >
              <div>
                <h2 className="font-serif text-lg font-medium text-[var(--primary)] sm:text-xl">
                  Add a new listing
                </h2>

                <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">
                  Share a new product with the Morrow community.
                </p>
              </div>

              <span className="text-xl text-[var(--primary)] transition group-hover:translate-x-1">
                →
              </span>
            </button>
          </section>

          {/* YOUR LISTINGS */}
          <section className="space-y-5">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-serif text-xl font-medium text-[var(--primary)] sm:text-2xl">
                  Your Listings
                </h2>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  Overview of recent products.
                </p>
              </div>

              <button
                onClick={() => navigate("/mylistings")}
                className="text-xs font-medium text-[var(--primary)] hover:underline"
              >
                See all →
              </button>
            </div>

            {/* EMPTY STATE */}
            {!loading && products.length === 0 && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-14 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E6EDE5] text-xl text-[var(--primary)]">
                  +
                </div>

                <h3 className="mt-4 font-serif text-lg text-[var(--primary)]">
                  No listings yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[var(--muted)]">
                  You haven't added any listings yet. Start by creating your first product.
                </p>

                <button
                  onClick={() => navigate("/listings/add")}
                  className="mt-5 rounded-full bg-[var(--primary)] px-6 py-2.5 text-xs font-medium text-white transition hover:bg-[var(--primary-hover)]"
                >
                  + Add your first listing
                </button>
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-12 text-center">
                <p className="text-sm text-[var(--muted)]">Loading listings...</p>
              </div>
            )}

            {/* PRODUCTS EXIST */}
            {!loading && products.length > 0 && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xs">
                <p className="text-sm text-[var(--muted)]">
                  You currently have{" "}
                  <span className="font-semibold text-[var(--primary)]">
                    {products.length}
                  </span>{" "}
                  listing(s).
                </p>

                <button
                  onClick={() => navigate("/mylistings")}
                  className="mt-3 text-xs font-medium text-[var(--terracotta)] hover:underline"
                >
                  Manage your listings →
                </button>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;