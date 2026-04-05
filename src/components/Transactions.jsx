import { useState, useMemo } from "react";
import { Search, Plus, Edit2, Trash2, ArrowUpDown, Filter } from "lucide-react";
import { formatNaira, formatDate } from "../utils/format";
import { CATEGORIES, CATEGORY_COLORS } from "../data/mockData";
import TransactionModal from "./TransactionModal";

export default function Transactions({ transactions, darkMode, role, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [showModal, setShowModal] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const card = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";
  const subText = darkMode ? "text-[#94A3B8]" : "text-[#6B7280]";
  const input = darkMode
    ? "bg-[#0F172A] border-[#334155] text-[#E5E7EB]"
    : "bg-white border-[#E5E7EB] text-[#111827]";
  const rowHover = darkMode ? "hover:bg-[#0F172A]" : "hover:bg-[#F9FAFB]";

  const filtered = useMemo(() => {
    let result = [...transactions];
    if (search) result = result.filter((t) => t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));
    if (filterType !== "all") result = result.filter((t) => t.type === filterType);
    if (filterCategory !== "all") result = result.filter((t) => t.category === filterCategory);
    if (filterDateFrom) result = result.filter((t) => t.date >= filterDateFrom);
    if (filterDateTo) result = result.filter((t) => t.date <= filterDateTo);
    result.sort((a, b) => {
      let diff = sortBy === "date" ? a.date.localeCompare(b.date) : a.amount - b.amount;
      return sortDir === "asc" ? diff : -diff;
    });
    return result;
  }, [transactions, search, filterType, filterCategory, filterDateFrom, filterDateTo, sortBy, sortDir]);

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setSortDir("desc"); }
  };

  
  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach((t) => {
      const key = t.date.substring(0, 7);
      if (!g[key]) g[key] = [];
      g[key].push(t);
    });
    return Object.entries(g).sort(([a], [b]) => b.localeCompare(a));
  }, [filtered]);

  return (
    <div className="space-y-5 animate-fade-in">
    
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl">Transactions</h2>
          <p className={`text-sm ${subText}`}>{filtered.length} of {transactions.length} transactions</p>
        </div>
        {role === "admin" && (
          <button
            onClick={() => { setEditTx(null); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#1E3A8A] text-white rounded-xl text-sm font-medium hover:bg-[#1e40af] transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add</span>
          </button>
        )}
      </div>

      <div className={`rounded-2xl border p-4 ${card} space-y-3`}>
        <div className="flex gap-3">
          <div className={`flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border ${input}`}>
            <Search size={16} className={subText} />
            <input
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#9CA3AF]"
              placeholder="Search transactions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
              showFilters ? "bg-[#1E3A8A] text-white border-[#1E3A8A]" : `${input} ${subText}`
            }`}
          >
            <Filter size={15} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1 animate-fade-in">
            <select
              className={`px-3 py-2 rounded-xl border text-sm outline-none ${input}`}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              className={`px-3 py-2 rounded-xl border text-sm outline-none ${input}`}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              type="date"
              className={`px-3 py-2 rounded-xl border text-sm outline-none ${input}`}
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              placeholder="From"
            />
            <input
              type="date"
              className={`px-3 py-2 rounded-xl border text-sm outline-none ${input}`}
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              placeholder="To"
            />
          </div>
        )}

        
        <div className="flex gap-2">
          {["date", "amount"].map((col) => (
            <button
              key={col}
              onClick={() => toggleSort(col)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                sortBy === col
                  ? "bg-[#1E3A8A]/10 text-[#1E3A8A] border-[#1E3A8A]/20"
                  : `${input} ${subText}`
              }`}
            >
              <ArrowUpDown size={12} />
              Sort by {col} {sortBy === col ? (sortDir === "asc" ? "↑" : "↓") : ""}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={`rounded-2xl border p-12 text-center ${card}`}>
          <Search size={32} className={`mx-auto mb-3 opacity-30 ${subText}`} />
          <p className={`text-sm ${subText}`}>No transactions match your filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {grouped.map(([month, txs]) => (
            <div key={month}>
              <p className={`text-xs font-semibold uppercase tracking-wider ${subText} mb-2 px-1`}>
                {new Date(month + "-01").toLocaleDateString("en-NG", { month: "long", year: "numeric" })}
              </p>
              <div className={`rounded-2xl border overflow-hidden ${card}`}>
                {txs.map((t, idx) => (
                  <div
                    key={t.id}
                    className={`flex items-center gap-3 px-4 py-3.5 transition-colors duration-150 ${rowHover} ${idx !== 0 ? `border-t ${darkMode ? "border-[#334155]" : "border-[#F3F4F6]"}` : ""}`}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                      style={{ backgroundColor: CATEGORY_COLORS[t.category] || "#9CA3AF" }}
                    >
                      {t.category.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{t.description}</p>
                      <p className={`text-xs ${subText}`}>{t.category} · {formatDate(t.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${t.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                        {t.type === "income" ? "+" : "-"}{formatNaira(t.amount)}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        t.type === "income" ? "bg-[#10B981]/10 text-[#10B981]" : "bg-[#EF4444]/10 text-[#EF4444]"
                      }`}>
                        {t.type}
                      </span>
                    </div>
                    {role === "admin" && (
                      <div className="flex gap-1 ml-2 flex-shrink-0">
                        <button
                          onClick={() => { setEditTx(t); setShowModal(true); }}
                          className={`p-1.5 rounded-lg hover:bg-[#1E3A8A]/10 text-[#1E3A8A] transition-colors`}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => { if (window.confirm("Delete this transaction?")) onDelete(t.id); }}
                          className="p-1.5 rounded-lg hover:bg-[#EF4444]/10 text-[#EF4444] transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <TransactionModal
          onClose={() => { setShowModal(false); setEditTx(null); }}
          onSave={(t) => {
            if (editTx) onEdit(editTx.id, t);
            else onAdd(t);
            setShowModal(false);
            setEditTx(null);
          }}
          darkMode={darkMode}
          initial={editTx}
        />
      )}
    </div>
  );
}
