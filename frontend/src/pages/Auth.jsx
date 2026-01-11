import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../services/authService";

const baseFields = { name: "", email: "", phone: "", password: "" };

export default function Auth({ mode = "login", setIsAuthenticated }) {
  const isSignup = mode === "signup";
  const [form, setForm] = useState(baseFields);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setForm(baseFields), [mode]);

  const title = useMemo(
    () => (isSignup ? "Create Account" : "Login"),
    [isSignup]
  );
  const subtitle = useMemo(
    () => (isSignup ? "Join SmartRX today" : "Welcome back to SmartRX"),
    [isSignup]
  );

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup && !form.name.trim()) return setError("Enter your name");
    if (!form.email.trim()) return setError("Enter your email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError("Enter a valid email");
    if (isSignup && !form.phone.trim()) return setError("Enter your phone");
    if (!form.password) return setError("Enter your password");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");

    setLoading(true);
    const action = isSignup ? signupUser : loginUser;
    const { success, data } = await action(form);
    setLoading(false);

    if (!success) return setError(data.message || "Request failed");

    const userData =
      data.user || { name: form.name, email: form.email, id: Date.now() };
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated?.(true);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-800 text-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-8 shadow-2xl"
      >
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-sm opacity-80">{subtitle}</p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-300/60 bg-red-500/10 px-3 py-2 text-sm text-red-100 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {isSignup && (
            <>
              <Input
                label="Full Name"
                value={form.name}
                onChange={(v) => updateField("name", v)}
              />
              <Input
                label="Phone Number"
                value={form.phone}
                onChange={(v) => updateField("phone", v)}
              />
            </>
          )}
          <Input
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(v) => updateField("email", v)}
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) => updateField("password", v)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 py-3 font-semibold shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:opacity-70"
        >
          {loading ? "Please wait..." : title}
        </button>
      </form>
    </div>
  );
}

function Input({ label, type = "text", value, onChange }) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="opacity-80">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-base text-slate-50 placeholder:text-slate-300/60 focus:border-blue-300 focus:ring-2 focus:ring-blue-400/60 outline-none"
        required
      />
    </label>
  );
}
