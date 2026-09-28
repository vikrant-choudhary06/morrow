import { useState } from "react";
import { useNavigate } from "react-router";
import Api from "../service/Api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await Api.post("/auth/register", formData);

      navigate("/login");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 overflow-y-auto backdrop-blur-xs">

    <div className="relative w-full max-w-md my-auto rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl">

      {/* Cut Button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute right-5 top-5 text-2xl text-[var(--muted)] hover:text-[var(--dark)]"
      >
        ×
      </button>

      {/* Heading */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
          MORROW
        </p>

        <h1 className="mt-2 font-serif text-3xl font-medium text-[var(--dark)]">
          Create Account
        </h1>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Create your account to get started.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
{/* confirmPassword */}
      <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-[var(--danger)]">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-medium text-white hover:bg-[var(--dark)] disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </form>

      {/* Login */}
      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="font-medium text-[var(--primary)] hover:underline"
        >
          Login
        </button>
      </p>

    </div>
  </div>
);
};

export default Register;