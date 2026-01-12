import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase/firebaseConfig";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Curtain from "./components/Curtain";
import Details from "./pages/Details";
import Assistant from "./pages/Assistant";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import LoadingScreen from "./components/LoadingScreen";

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

  useEffect(() => {
    if (isAuthenticated) {
      setAppLoading(true);
      const t = setTimeout(() => setAppLoading(false), 5000);
      return () => clearTimeout(t);
    }
  }, [isAuthenticated]);

  const triggerLoading = (callback) => {
    console.log("🎬 triggerLoading called!");
    setAppLoading(true);
    setTimeout(() => {
      console.log("🛑 triggerLoading timeout - clearing");
      setAppLoading(false);
      if (callback) callback();
    }, 5000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-blue-50">
        <p className="text-lg text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-transparent text-white">
      {/* Full-screen loading overlay with capsule animation */}
      {appLoading && <LoadingScreen />}

      {isAuthenticated ? (
        <Curtain>
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
        </Curtain>
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
