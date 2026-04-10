import { useState } from "react";
import { Camera, User, Mail, Phone, Lock } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useTheme } from "../context/ThemeContext";

function Profile() {
  const { isDark } = useTheme();

  const [user, setUser] = useState({
    name: "Harshal Makode",
    email: "harshal@example.com",
    phone: "9876543210",
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated user:", user);
    // TODO: API call
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <Header />

      <div className="relative max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-6 shadow-sm flex items-center gap-6">
          
          <div className="relative">
            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-indigo-500 text-white p-1 rounded-full">
              <Camera size={14} />
            </button>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-sm text-slate-400">{user.email}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-xs text-slate-400">Full Name</label>
              <div className="flex items-center gap-2 mt-1">
                <User size={16} />
                <input
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400">Email</label>
              <div className="flex items-center gap-2 mt-1">
                <Mail size={16} />
                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400">Phone</label>
              <div className="flex items-center gap-2 mt-1">
                <Phone size={16} />
                <input
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

          </div>

          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm"
          >
            Save Changes
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;