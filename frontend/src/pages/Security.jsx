import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useTheme } from "../context/ThemeContext";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Security = () => {
  const { isDark } = useTheme();
  const { user: authUser } = useAuth();

  const [form, setForm] = useState({
    password: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleUpdatePassword = async () => {
    if (!authUser?.token) {
      setError("Session expired. Please login again.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:8081/api/user/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authUser.token}`,
          },
          body: JSON.stringify(form),
        },
      );

      if (!res.ok) throw new Error("Password update failed");

      alert("Password updated successfully");

      setForm({
        password: "",
        newPassword: "",
      });
    } catch (err) {
      console.error(err);
      setError("Error updating password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!authUser?.token) {
      setError("Session expired. Please login again.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8081/api/user/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("Account deleted successfully");

      // ✅ logout + redirect
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("Error deleting account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <Header />

      <div className="relative max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Change Password
          </h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lock size={16} />
              <input
                type="password"
                name="password"
                placeholder="Current Password"
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Lock size={16} />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-red-200 dark:border-red-500/30 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-red-500 mb-3">Danger Zone</h2>

          <button
            onClick={handleDeleteAccount}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            {loading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Security;
