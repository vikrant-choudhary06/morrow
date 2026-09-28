import { useLoaderData, useSearchParams } from "react-router";
import Card from "../components/Card";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: {
    amount: number;
    currency: string;
  };
  images: string[];
};

const categories = [
  { label: "All", value: "" },
  { label: "Furniture", value: "Furniture" },
  { label: "Lighting", value: "Lighting" },
  { label: "Decor", value: "Decor" },
  { label: "Ceramics", value: "Ceramics" },
];

const Listings = () => {
  const products = (useLoaderData() as Product[]) || [];
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            Marketplace
          </p>

          <h1 className="mt-2 font-serif text-3xl font-medium text-[var(--dark)] sm:text-4xl">
            All Listings
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Explore authentic handcrafted and vintage pieces.
          </p>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchParams.get("search") || ""}
            onChange={(e) => {
              const search = e.target.value;
              const params: Record<string, string> = {};
              const category = searchParams.get("category");

              if (category) {
                params.category = category;
              }
              if (search) {
                params.search = search;
              }

              setSearchParams(params);
            }}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] md:max-w-md shadow-2xs"
          />

          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category.value;

              return (
                <button
                  key={category.label}
                  onClick={() => {
                    const search = searchParams.get("search");
                    const params: Record<string, string> = {};

                    if (category.value !== "") {
                      params.category = category.value;
                    }
                    if (search) {
                      params.search = search;
                    }

                    setSearchParams(params);
                  }}
                  className={`rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition ${
                    isActive
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-xs"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--primary)]"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {products.length === 0 ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] px-6 py-16 text-center">
            <h3 className="font-serif text-xl font-medium text-[var(--dark)]">
              No products found
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Try adjusting your search or category filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default Listings;