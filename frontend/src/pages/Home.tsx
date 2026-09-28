import { useEffect, useState } from "react";
import Api from "../service/Api.tsx";
import Card from "../components/Card";
import { NavLink, useNavigate } from "react-router";

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
  {
    name: "Furniture",
    image: "/images/furniture.png",
  },
  {
    name: "Lighting",
    image: "/images/Light.png",
  },
  {
    name: "Decor",
    image: "/images/decor.png",
  },
  {
    name: "Ceramics",
    image: "/images/cermos.png",
  },
];

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await Api.get("/products");
        setProducts(response.data?.data?.user?.products || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-16">

      {/* ================= HERO ================= */}
      <section>
        <div className="grid items-center gap-10 rounded-3xl bg-[#e3e2d6] px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-2 lg:px-16">

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[var(--muted)]">
              Thoughtfully found, ready for a new home
            </p>

            <h1 className="font-serif text-3xl leading-tight text-[var(--dark)] sm:text-4xl md:text-5xl lg:text-6xl">
              Good things find their next place.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Discover unique products from independent sellers and find
              something worth bringing home.
            </p>

            <button
              onClick={() => navigate("/listings")}
              className="mt-8 rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] shadow-sm"
            >
              Explore Listings →
            </button>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="group relative h-[320px] w-full max-w-[480px] overflow-hidden rounded-3xl border border-white/60 bg-white shadow-lg transition duration-500 hover:shadow-xl sm:h-[380px] md:h-[440px]">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                alt="Curated modern and vintage interior collection"
              />

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

              {/* Floating aesthetic caption badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/30 bg-white/85 p-3.5 backdrop-blur-md shadow-xs sm:bottom-6 sm:left-6 sm:right-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    Curated Space
                  </p>
                  <p className="font-serif text-sm font-medium text-[var(--dark)] sm:text-base">
                    Mid-Century & Modern Living
                  </p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-xs text-white shadow-xs">
                  ✦
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Featured
            </p>

            <h2 className="font-serif text-2xl text-[var(--dark)] sm:text-3xl md:text-4xl">
              Find your next favourite
            </h2>
          </div>

          <button
            onClick={() => navigate("/listings")}
            className="hidden text-sm font-medium text-[var(--primary)] hover:underline md:block"
          >
            View all listings →
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] px-6 py-12 sm:px-8">
        <div className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            Explore
          </p>
          <h2 className="font-serif text-2xl text-[var(--dark)] sm:text-3xl">
            Shop by category
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <NavLink
              key={category.name}
              to={`/listings?category=${category.name}`}
              className="group relative h-48 overflow-hidden rounded-2xl border border-[var(--border)] shadow-xs transition hover:shadow-md"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/20" />

              <h3 className="absolute bottom-5 left-5 text-xl font-medium text-white">
                {category.name}
              </h3>
            </NavLink>
          ))}
        </div>
      </section>

      {/* ================= BROWSE ================= */}
      <section>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Browse
            </p>

            <h2 className="font-serif text-2xl text-[var(--dark)] sm:text-3xl">
              Browse all listings
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["All", "Furniture", "Lighting", "Decor"].map((category) => (
              <NavLink
                key={category}
                to={
                  category === "All"
                    ? "/listings"
                    : `/listings?category=${category}`
                }
                className={({ isActive }) =>
                  `rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition ${
                    isActive
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--primary)]"
                  }`
                }
              >
                {category}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;