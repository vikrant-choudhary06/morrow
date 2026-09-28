import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Api from "../../service/Api";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [stock, setStock] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Api.get(`/products/${id}`);
        const product = response.data?.data?.product;

        if (product) {
          setName(product.name || "");
          setDescription(product.description || "");
          setCategory(product.category || "");
          setPrice(String(product.price?.amount || ""));
          setCurrency(product.price?.currency || "INR");
          setStock(String(product.stock || ""));
        }
      } catch (error: any) {
        console.error("FETCH PRODUCT ERROR:", error);
        setError(error.response?.data?.message || "Failed to load listing");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = {
        name,
        description,
        category,
        price: {
          amount: Number(price),
          currency,
        },
        stock: Number(stock),
      };

      await Api.put(`/products/${id}`, data);
      navigate("/mylistings");
    } catch (error: any) {
      console.error("UPDATE LISTING ERROR:", error);
      setError(error.response?.data?.message || "Failed to update listing");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-sm text-[var(--muted)]">
        Loading listing details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[#FCFAF6] px-4 sm:px-8">
        <p className="text-xs font-medium text-[var(--muted)]">
          My Space / Edit Listing
        </p>

        <button
          onClick={() => navigate("/mylistings")}
          className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]"
        >
          Cancel
        </button>
      </header>

      <main className="px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Manage
            </p>

            <h1 className="mt-2 font-serif text-3xl font-medium text-[var(--primary)] sm:text-4xl">
              Edit Listing
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Update your listing information and inventory.
            </p>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-[var(--danger)]">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-xs space-y-6"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                Product Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              >
                <option value="">Select category</option>
                <option value="Furniture">Furniture</option>
                <option value="Lighting">Lighting</option>
                <option value="Decor">Decor</option>
                <option value="Ceramics">Ceramics</option>
              </select>
            </div>

            {/* Price */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                  Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  required
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                Stock
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                min="0"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[var(--primary)] px-7 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] shadow-xs"
            >
              Update Listing
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditListing;