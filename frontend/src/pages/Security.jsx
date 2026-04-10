import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useTheme } from "../context/ThemeContext";
import { Lock } from "lucide-react";

const Security = () => {
  const { isDark } = useTheme();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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

          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm">
            Update Password
          </button>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-red-200 dark:border-red-500/30 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-red-500 mb-3">Danger Zone</h2>

          <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">
            Delete Account
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Security;