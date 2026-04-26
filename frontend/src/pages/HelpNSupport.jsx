import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useTheme } from "../context/ThemeContext";
import { Mail, MessageCircleQuestion, Send } from "lucide-react";

const HelpNSupport = () => {
  const { isDark } = useTheme();

  const [form, setForm] = useState({
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

        {/* Contact Support */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Contact Support
          </h2>

          <div className="space-y-4">

            {/* Subject */}
            <div className="flex items-center gap-2 border-b border-transparent focus-within:border-blue-500 transition">
              <Mail size={16} className="opacity-70" />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-1"
              />
            </div>

            {/* Message */}
            <div className="flex items-start gap-2 border-b border-transparent focus-within:border-blue-500 transition">
              <MessageCircleQuestion size={16} className="opacity-70 mt-1" />
              <textarea
                name="message"
                placeholder="Describe your issue..."
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent outline-none resize-none py-1"
              />
            </div>

          </div>

          <button className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-600 transition">
            <Send size={14} />
            Send Message
          </button>
        </div>

        {/* FAQ Section */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-sm">

            <div>
              <p className="font-semibold">How do I reset my password?</p>
              <p className="text-slate-500 dark:text-slate-400">
                Go to Account settings and update your password from there.
              </p>
            </div>

            <div>
              <p className="font-semibold">How do I delete my account?</p>
              <p className="text-slate-500 dark:text-slate-400">
                You can delete your account from the "Danger Zone" in settings.
              </p>
            </div>

            <div>
              <p className="font-semibold">How long does support take?</p>
              <p className="text-slate-500 dark:text-slate-400">
                Usually within 24–48 hours depending on the issue.
              </p>
            </div>

          </div>
        </div>

        {/* Quick Help */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Quick Help
          </h2>

          <div className="flex flex-wrap gap-3 text-sm">
            <button className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-md">
              Account Issues
            </button>
            <button className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-md">
              Payment Problems
            </button>
            <button className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-md">
              Report Bug
            </button>
            <button className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-md">
              Feature Request
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HelpNSupport;