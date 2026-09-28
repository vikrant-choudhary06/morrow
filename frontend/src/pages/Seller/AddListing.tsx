import { useState } from "react";
import { useNavigate } from "react-router";
import Api from "../../service/Api";

const AddListing = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);

      formData.append(
        "price",
        JSON.stringify({
          amount: Number(price),
          currency: currency,
        })
      );

      formData.append("stock", stock);

      if (images) {
        Array.from(images).forEach((image) => {
          formData.append("images", image);
        });
      }

      await Api.post("/products", formData);
      navigate("/mylistings");
    } catch (error: any) {
      console.error("CREATE LISTING ERROR:", error);
      setError(error.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* TOPBAR */}
      <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[#FCFAF6] px-4 sm:px-8">
        <p className="text-xs font-medium text-[var(--muted)]">
          My Space / Add Listing
        </p>

        <button
          onClick={() => navigate("/mylistings")}
          className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]"
        >
          Cancel
        </button>
      </header>

      {/* MAIN */}
      <main className="px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-3xl space-y-8">

          {/* HEADING */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Create
            </p>

            <h1 className="mt-2 font-serif text-3xl font-medium text-[var(--primary)] sm:text-4xl">
              Add a listing
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Add a new product to your Morrow store.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-xs space-y-6"
          >
            {/* NAME */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mid-Century Walnut Lounge Chair"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe material, condition, dimensions, and craft details..."
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>

            {/* CATEGORY */}
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

            {/* PRICE + CURRENCY */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                  Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="2000"
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

            {/* STOCK */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                Available Stock
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                min="0"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>

            {/* IMAGES */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                Product Images
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[var(--primary)] file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-[var(--primary-hover)]"
              />

              <p className="mt-2 text-xs text-[var(--muted)]">
                You can upload up to 3 high-quality images.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-xs text-[var(--danger)]">
                {error}
              </p>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 shadow-xs"
            >
              {loading ? "Creating listing..." : "Publish Listing"}
            </button>
          </form>

        </div>
      </main>
    </div>
  );
};

export default AddListing;