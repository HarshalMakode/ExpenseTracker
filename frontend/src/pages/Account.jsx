import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useTheme } from "../context/ThemeContext";
import { User, Mail, Phone, Image } from "lucide-react";

const Account = () => {
  const { isDark } = useTheme();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    bio: ""
  });

  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setTouched(true);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isValid = user.name && user.email;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      {/* Grid Background */}
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

            {/* Phone */}
            <div className="flex items-center gap-2 border-b border-transparent focus-within:border-blue-500 transition">
              <Phone size={16} className="opacity-70" />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={user.phone}
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-1"
              />
            </div>

            {/* Bio */}
            <div className="flex items-start gap-2 border-b border-transparent focus-within:border-blue-500 transition">
              <User size={16} className="opacity-70 mt-1" />
              <textarea
                name="bio"
                placeholder="Write something about yourself..."
                value={user.bio}
                onChange={handleChange}
                className="w-full bg-transparent outline-none resize-none py-1"
                rows={3}
              />
            </div>

            {/* Profile Image */}
            <div className="flex items-center gap-2">
              <Image size={16} className="opacity-70" />
              <input
                type="file"
                className="w-full text-sm file:mr-3 file:px-3 file:py-1 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:cursor-pointer"
              />
            </div>

          </div>

          {/* Button */}
          <button
            disabled={!isValid || !touched}
            className={`mt-5 px-4 py-2 rounded-lg text-sm transition ${
              isValid && touched
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Account;