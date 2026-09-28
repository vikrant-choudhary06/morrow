import { NavLink } from "react-router";

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

const Categories = () => {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            Explore
          </p>

          <h1 className="mt-2 font-serif text-3xl font-medium text-[var(--dark)] sm:text-4xl">
            Categories
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Browse our curated collections by category.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <NavLink
              key={category.name}
              to={`/listings?category=${category.name}`}
              className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-[var(--background)]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <div className="flex items-center justify-between px-5 py-4">
                <h2 className="font-serif text-base font-medium text-[var(--dark)]">
                  {category.name}
                </h2>

                <span className="text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-[var(--terracotta)]">
                  →
                </span>
              </div>
            </NavLink>
          ))}
        </div>

      </div>
    </main>
  );
};

export default Categories;