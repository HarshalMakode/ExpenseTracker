import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import Security from "./pages/Security";
import HelpNSupport from "./pages/HelpNSupport";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
      />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected route */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/" />
        }
      />

      <Route path="/profile" element={<Profile/>} />

      <Route path="/account" element={<Account/>}/>

      <Route path="/security" element={<Security/>}/>

      <Route path="/help" element={<HelpNSupport/>}/>

    </Routes>
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