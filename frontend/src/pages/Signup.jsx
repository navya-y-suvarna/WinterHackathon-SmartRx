
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Signup.css";
import { signupWithEmail } from "../services/firebaseAuth";

export default function Signup({ setIsAuthenticated, onNavigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Existing validations (UNCHANGED)
    if (!name) return setError("Please enter your name first");
    if (!email) return setError("Please enter your email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email address");
    if (!phone) return setError("Please enter your phone number");
    if (!password) return setError("Please create a password");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    setLoading(true);

    try {
      // 🔥 Firebase Signup
      const userCredential = await signupWithEmail(email, password);

      console.log("Firebase User:", userCredential.user);

      // ✅ Authentication handled by Firebase
      onNavigate?.(() => {
        setIsAuthenticated(true);
        navigate("/");
      }); // 🔥 Show loading screen, then navigate
    } catch (err) {
      console.error(err);

      if (err.code === "auth/email-already-in-use") {
        setError("Email already registered");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join SmartRX today</p>

        {error && <div className="error-box">{error}</div>}

        <div className="input-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder=" "
          />
          <label>Full Name</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
          />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder=" "
          />
          <label>Phone Number</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label>Password</label>
        </div>

        <button className="signup-btn" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
