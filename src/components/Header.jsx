import { Moon, Sun, Menu, Shield, Eye } from "lucide-react";

const TAB_LABELS = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  insights: "Insights",
};

export default function Header({ darkMode, setDarkMode, role, setRole, onMenuClick, activeTab }) {
  const bg = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";

  return (
    <header className={`flex items-center justify-between px-4 md:px-6 py-4 border-b ${bg} z-10`}>
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-[#1E3A8A]/10 text-[#6B7280]"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="font-display font-bold text-lg leading-none">{TAB_LABELS[activeTab]}</h1>
          <p className="text-xs text-[#6B7280] mt-0.5 hidden sm:block">
            {new Date().toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Role Switcher */}
        <div className={`flex items-center gap-1 p-1 rounded-xl ${darkMode ? "bg-[#0F172A]" : "bg-[#F3F4F6]"}`}>
          <button
            onClick={() => setRole("viewer")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              role === "viewer"
                ? "bg-[#F59E0B] text-white shadow-sm"
                : "text-[#6B7280] hover:text-current"
            }`}
          >
            <Eye size={13} />
            <span className="hidden sm:inline">Viewer</span>
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              role === "admin"
                ? "bg-[#1E3A8A] text-white shadow-sm"
                : "text-[#6B7280] hover:text-current"
            }`}
          >
            <Shield size={13} />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>

        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode((d) => !d)}
          className={`p-2 rounded-xl transition-all duration-200 ${
            darkMode ? "bg-[#334155] text-[#F59E0B]" : "bg-[#F3F4F6] text-[#6B7280]"
          }`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        
        <div className="w-8 h-8 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-xs font-bold">
          {role === "admin" ? "BJ" : "VW"}
        </div>
      </div>
    </header>
  );
}
