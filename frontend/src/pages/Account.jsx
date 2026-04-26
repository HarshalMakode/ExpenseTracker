import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useTheme } from "../context/ThemeContext";
import { User, Mail, Phone, Image } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Account = () => {
  const { isDark } = useTheme();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const { user: authUser } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!authUser?.token) {
          setError("Session expired. Please login again.");
          return;
        }

        const res = await fetch("http://localhost:8081/api/user/profile", {
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();

        setUser({
          name: data.name || "",
          email: data.email || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    if (authUser?.token) {
      fetchProfile();
    }
  }, [authUser?.token]);

  const handleChange = (e) => {
    setTouched(true);
    setError(""); // ✅ clear error
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!touched) return;

    if (!authUser?.token) {
      setError("Session expired. Please login again.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("http://localhost:8081/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser?.token}`,
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Profile updated successfully");
      setTouched(false);
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const isValid = user.name && user.email;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(${
            isDark ? "#ffffff" : "#000000"
          } 1px, transparent 1px), linear-gradient(90deg, ${
            isDark ? "#ffffff" : "#000000"
          } 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <Header />

      <div className="relative max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Edit Profile Card */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Edit Profile
          </h2>

          {error && (<p className="text-red-500 text-sm mb-3">{error}</p>)}

          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-2 border-b border-transparent focus-within:border-blue-500 transition">
              <User size={16} className="opacity-70" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={user.name}
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-1"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 border-b border-transparent focus-within:border-blue-500 transition">
              <Mail size={16} className="opacity-70" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={user.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-1"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!isValid || !touched || saving}
            className={`mt-5 px-4 py-2 rounded-lg text-sm transition ${
              isValid && touched && !saving
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Account;
