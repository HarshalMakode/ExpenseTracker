import { useState, useEffect } from "react";
import {
  Bell,
  CheckCircle,
  Trash2,
  Calendar,
  AlertCircle,
  Info,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import Header from "../layout/Header";

export default function Notifications() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = user?.token;

  // Styling Constants (Matching your Login UI)
  const cardBase =
    "relative rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 shadow-xl shadow-slate-200/60 dark:shadow-slate-900/60 p-6 transition-all duration-200";

  useEffect(() => {
    // Only fetch if the user and token are ready
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/notifications", {
        method: "GET",
        headers: {
          // Use the 'token' variable we defined above
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:8081/api/notifications/${id}/read`, {
        method: "PUT",
        headers: {
          // CHANGE THIS LINE from userToken to token
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const clearAll = async () => {
    if (!window.confirm("Are you sure you want to clear all notifications?")) return;

    try {
      const res = await fetch("http://localhost:8081/api/notifications/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setNotifications([]); // Clear the UI instantly
      }
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
    >
      {/* Grid background matching Login */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <Header />

      <main className="relative flex-1 max-w-2xl mx-auto w-full px-4 py-12">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Activity Feed
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
              Manage your budget alerts and system updates
            </p>
          </div>
          <button onClick={clearAll} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-500 animate-pulse">
              Updating feed...
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`${cardBase} ${!n.read ? "ring-1 ring-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-500/5" : "opacity-80"}`}
              >
                <div className="flex gap-4">
                  {/* Status Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      n.title.toLowerCase().includes("budget")
                        ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                        : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    }`}
                  >
                    {n.title.toLowerCase().includes("budget") ? (
                      <AlertCircle size={20} />
                    ) : (
                      <Info size={20} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {n.title}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 flex items-center gap-1 uppercase tracking-wider">
                        <Calendar size={10} />
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {n.message}
                    </p>

                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 hover:underline"
                      >
                        <CheckCircle size={12} />
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`${cardBase} py-12 text-center`}>
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Bell size={24} />
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                All caught up!
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                New notifications will appear here.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="relative pb-8 text-center mt-auto">
        <p className="text-[11px] font-medium text-slate-300 dark:text-slate-600 tracking-wide uppercase">
          Ledger Protocol v1.0
        </p>
      </footer>
    </div>
  );
}
