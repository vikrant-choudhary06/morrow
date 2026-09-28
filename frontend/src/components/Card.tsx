import { NavLink } from "react-router";

type CardProps = {
  product: {
    _id: string;
    name: string;
    category: string;
    price: {
      amount: number;
      currency: string;
    };
    images: string[];
  };
};

const Card = ({ product }: CardProps) => {
  const imageUrl = product.images?.[0] || "/placeholder.png";

  return (
    <div className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-[var(--background)]">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80";
          }}
        />
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          {product.category}
        </p>

        <h3 className="mt-1.5 truncate font-serif text-lg font-medium text-[var(--dark)]">
          {product.name}
        </h3>

        <p className="mt-3 text-base font-semibold text-[var(--dark)]">
          {product.price?.currency === "INR" ? "₹" : product.price?.currency || "$"}{" "}
          {product.price?.amount}
        </p>

        <NavLink
          to={`/listings/${product._id}`}
          className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-[var(--terracotta)] transition hover:text-[var(--primary)]"
        >
          View Details →
        </NavLink>
      </div>
    </div>
  );
};

export default Card;