import { Wallet, Home} from "lucide-react";
import SettingsLayout from "./SettingsLayout";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 mb-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/30">
          <Wallet size={17} className="text-white" />
        </div>
        <div>
          <h1 className="text-base font-black tracking-tight leading-none text-slate-900 dark:text-white">
            Expense Tracker<span className="text-indigo-500">.</span>
          </h1>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
            Personal Finance Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
        >
          <Home size={18} className="text-slate-700 dark:text-slate-200" />
        </button>

        <SettingsLayout />
      </div>
    </header>
  );
}
