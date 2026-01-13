import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase/firebaseConfig";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Details from "./pages/Details";
import Assistant from "./pages/Assistant";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import LoadingScreen from "./components/LoadingScreen";
import Plasma from "./components/Plasma/Plasma";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    console.log("🔥 Firebase Auth connected:", auth);

    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const triggerLoading = (callback) => {
    console.log("🎬 triggerLoading called!");
    setAppLoading(true);
    setTimeout(() => {
      console.log("🛑 triggerLoading timeout - clearing");
      setAppLoading(false);
      if (callback) callback();
    }, 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-slate-600 font-medium">Initializing SmartRx...</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-transparent text-white relative">
      <Plasma
        color="#2563eb"
        speed={0.4}
        direction="forward"
        opacity={0.7}
        scale={1.2}
      />
      {/* Full-screen loading overlay with capsule animation */}
      {appLoading && <LoadingScreen />}

      {isAuthenticated ? (
        <Routes>
          <Route
            path="/"
            element={<Home onLogout={handleLogout} onNavigate={triggerLoading} />}
          />
          <Route
            path="/search/:query"
            element={<SearchResults onLogout={handleLogout} onNavigate={triggerLoading} />}
          />
          <Route
            path="/details/:id"
            element={<Details onLogout={handleLogout} />}
          />

          <Route
            path="/assistant"
            element={<Assistant onLogout={handleLogout} onNavigate={triggerLoading} />}
          />

          {/* ✅ Category Routes */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:category" element={<CategoryProductsPage />} />

          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} onNavigate={triggerLoading} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsAuthenticated={setIsAuthenticated} onNavigate={triggerLoading} />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  );
}
