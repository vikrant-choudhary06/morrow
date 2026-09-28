import { useState } from "react";
import { useNavigate } from "react-router";
import Api from "../service/Api";
import {
  setUser,
  setAccessToken,
} from "../Storee/slices/authSlice.tsx";
import { useAppDispatch } from "../Storee/hooks.tsx";

const Loginpage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

      const response = await Api.post("/auth/login", formData);

      console.log("LOGIN RESPONSE:", response.data);

      const { user, accessToken } = response.data.data;

      console.log("NEW ACCESS TOKEN:", accessToken);

      // Save user in Redux
      dispatch(setUser(user));

      // Save access token in Redux
      dispatch(setAccessToken(accessToken));

      // Save access token in localStorage
      localStorage.setItem("accessToken", accessToken);

      console.log(
        "SAVED TOKEN:",
        localStorage.getItem("accessToken")
      );

      navigate("/dashboard");

    } catch (error: any) {
      console.log("LOGIN ERROR:", error);

      setError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 overflow-y-auto backdrop-blur-xs">

      {/* Login Card */}
      <div className="relative w-full max-w-md my-auto rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl">

        {/* Close Button */}
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
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Login to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

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

          {/* Error */}
          {error && (
            <p className="text-sm text-[var(--danger)]">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[var(--dark)] disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-medium text-[var(--primary)] hover:underline"
          >
            Create Account
          </button>
        </p>

      </div>
    </div>
  );
};

export default Loginpage;