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

const MyListings = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmed) return;

    try {
      await Api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error: any) {
      console.error("DELETE ERROR:", error);
      alert(error.response?.data?.message || "Failed to delete listing");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* TOPBAR */}
      <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[#FCFAF6] px-4 sm:px-8">
        <p className="text-xs font-medium text-[var(--muted)]">
          My Space / My Listings
        </p>

        <button
          onClick={() => navigate("/listings/add")}
          className="rounded-full bg-[var(--primary)] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[var(--primary-hover)] shadow-xs"
        >
          + Add a listing
        </button>
      </header>

      {/* CONTENT */}
      <main className="px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* HEADING */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Manage
            </p>

            <h1 className="mt-2 font-serif text-3xl font-medium text-[var(--primary)] sm:text-4xl">
              My Listings
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Manage your products and inventory.
            </p>
          </div>

          {/* SEARCH */}
          <div>
            <input
              type="text"
              placeholder="Search listings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] md:max-w-md shadow-2xs"
            />
          </div>

          {/* TABLE CONTAINER */}
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xs">
            {/* HEADER */}
            <div className="hidden grid-cols-5 border-b border-[var(--border)] bg-[#FCFAF6] px-6 py-4 text-xs font-medium uppercase tracking-wider text-[var(--muted)] md:grid">
              <span>Product</span>
              <span>Category</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Actions</span>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="px-6 py-12 text-center text-sm text-[var(--muted)]">
                Loading listings...
              </div>
            )}

            {/* EMPTY */}
            {!loading && filteredProducts.length === 0 && (
              <div className="px-6 py-14 text-center">
                <h2 className="font-serif text-xl font-medium text-[var(--primary)]">
                  No listings found
                </h2>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  Add your first listing to get started.
                </p>
              </div>
            )}

            {/* PRODUCTS LIST */}
            {!loading &&
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="grid gap-3 border-b border-[var(--border)] p-5 last:border-b-0 md:grid-cols-5 md:items-center md:px-6 md:py-4 transition hover:bg-[#FCFAF6]"
                >
                  {/* PRODUCT */}
                  <div>
                    <span className="text-xs font-medium uppercase text-[var(--muted)] md:hidden">Product: </span>
                    <span className="text-sm font-semibold text-[var(--primary)]">
                      {product.name}
                    </span>
                  </div>

                  {/* CATEGORY */}
                  <div>
                    <span className="text-xs font-medium uppercase text-[var(--muted)] md:hidden">Category: </span>
                    <span className="inline-block rounded-full bg-[var(--background)] px-2.5 py-0.5 text-xs text-[var(--muted)]">
                      {product.category}
                    </span>
                  </div>

                  {/* PRICE */}
                  <div>
                    <span className="text-xs font-medium uppercase text-[var(--muted)] md:hidden">Price: </span>
                    <span className="text-sm font-medium text-[var(--text)]">
                      {product.price.currency === "INR" ? "₹" : product.price.currency}{" "}
                      {product.price.amount}
                    </span>
                  </div>

                  {/* STOCK */}
                  <div>
                    <span className="text-xs font-medium uppercase text-[var(--muted)] md:hidden">Stock: </span>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        product.stock === 0
                          ? "bg-red-50 text-[var(--danger)]"
                          : "bg-green-50 text-[var(--success)]"
                      }`}
                    >
                      {product.stock === 0 ? "Out of Stock" : `${product.stock} in stock`}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-4 pt-1 md:pt-0">
                    <button
                      onClick={() => navigate(`/listings/${product._id}/edit`)}
                      className="text-xs font-semibold text-[var(--primary)] hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-xs font-semibold text-[var(--danger)] hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default MyListings;