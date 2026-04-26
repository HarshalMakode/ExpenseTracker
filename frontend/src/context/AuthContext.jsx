import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load user from token on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      setUser({
        token,
        role: decoded.role,
      });
    } catch (err) {
      console.error("Invalid token:", err);

      // Remove bad token
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  // ── Login ────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const decoded = jwtDecode(data.token);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token
      localStorage.setItem("token", data.token);

      setUser({
        email,
        token: data.token,
        role: decoded.role,
      });

      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  }, []);

  // ── Signup ───────────────────────────────────────────────────────────────
  const signup = useCallback(async (name, email, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const decoded = jwtDecode(data.token);

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Store token
      localStorage.setItem("token", data.token);

      setUser({
        email,
        token: data.token,
        role: decoded.role,
      });
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  }, []);

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem("token"); // remove token
    setUser(null);
    setError("");
  }, []);

  // ── Helper: Get Auth Header ──────────────────────────────────────────────
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // ── Example: Fetch Profile ───────────────────────────────────────────────
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8081/api/user/profile", {
        headers: getAuthHeader(),
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.text(); // your API returns string
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  // ── Update Profile ───────────────────────────────────────────────────────
  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };

      // Recalculate avatar initials if name changed
      if (updates.name) {
        updated.avatar = updates.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
      }

      return updated;
    });
  }, []);

  // ── Clear Error ──────────────────────────────────────────────────────────
  const clearError = useCallback(() => setError(""), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
