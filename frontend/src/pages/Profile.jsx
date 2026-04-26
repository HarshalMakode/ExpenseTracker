import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Camera, User, Mail, Phone, Lock } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

function Profile() {
  const { isDark } = useTheme();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/user/profile", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();

        setUserData({
          name: data.name || "",
          email: data.email || ""
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchProfile();
    }
  }, [user?.token]);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

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
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Full Name</label>
              <div className="flex items-center gap-2 mt-1">
                <User size={16} />
                <input
                  name="name"
                  value={userData.name}
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
                  value={userData.email}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* <div>
              <label className="text-xs text-slate-400">Phone</label>
              <div className="flex items-center gap-2 mt-1">
                <Phone size={16} />
                <input
                  name="phone"
                  value={userData.phone}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div> */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
