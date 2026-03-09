import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState("login");

  // Auto-redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) setPage("dashboard");
    else setPage("login");
  }, [isAuthenticated]);

  return (
    <>
      {page === "login" && <Login onNavigate={setPage} />}
      {page === "signup" && <Signup onNavigate={setPage} />}
      {page === "dashboard" && <Dashboard onNavigate={setPage} />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}
