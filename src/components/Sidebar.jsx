import { LayoutDashboard, ArrowLeftRight, Lightbulb, X } from "lucide-react";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar({ activeTab, setActiveTab, darkMode, open, onClose }) {
  const bg = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";
  const hoverBg = darkMode ? "hover:bg-[#334155]" : "hover:bg-[#EFF6FF]";
  const activeBg = "bg-[#1E3A8A] text-white";

  return (
    <>
      
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 flex flex-col border-r transition-transform duration-300
          ${bg}
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-inherit">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] flex items-center justify-center">
              <span className="text-white font-bold text-lg">₦</span>
            </div>
            <div>
              <p className="font-display font-bold text-[#1E3A8A] text-lg leading-none">NairaFlow</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">Finance Dashboard</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-[#6B7280] hover:text-current">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${activeTab === id ? activeBg : `${hoverBg} text-[#6B7280]`}
              `}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-inherit">
          <p className="text-xs text-[#6B7280] text-center">NairaFlow v1.0.0</p>
        </div>
      </aside>
    </>
  );
}
