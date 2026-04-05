import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Wallet, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { formatNaira, groupByMonth, groupByCategory } from "../utils/format";
import { CATEGORY_COLORS } from "../data/mockData";
import TransactionModal from "./TransactionModal";

export default function Dashboard({ transactions, darkMode, role, onAdd, onClear }) {
  const [showBalance, setShowBalance] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const card = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";
  const subText = darkMode ? "text-[#94A3B8]" : "text-[#6B7280]";

  const totalIncome = useMemo(() => transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalExpense = useMemo(() => transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0), [transactions]);
  const balance = totalIncome - totalExpense;

  const monthlyData = useMemo(() => groupByMonth(transactions), [transactions]);
  const categoryData = useMemo(() => groupByCategory(transactions), [transactions]);

  const maxMonthly = Math.max(...monthlyData.map((m) => Math.max(m.income, m.expense)), 1);
  const totalCatExpense = categoryData.reduce((s, c) => s + c.amount, 0);

  const STATS = [
    { label: "Total Balance", value: balance, icon: Wallet, color: balance >= 0 ? "#1E3A8A" : "#EF4444", bg: balance >= 0 ? "bg-[#1E3A8A]/10" : "bg-[#EF4444]/10" },
    { label: "Total Income", value: totalIncome, icon: TrendingUp, color: "#10B981", bg: "bg-[#10B981]/10" },
    { label: "Total Expenses", value: totalExpense, icon: TrendingDown, color: "#EF4444", bg: "bg-[#EF4444]/10" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
   
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl">Financial Overview</h2>
          <p className={`text-sm ${subText}`}>Track your income and expenses</p>
        </div>
        <div className="flex gap-2">
          {role === "admin" && (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1E3A8A] text-white rounded-xl text-sm font-medium hover:bg-[#1e40af] transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add Transaction</span>
              </button>
              <button
                onClick={() => { if (window.confirm("Clear all transactions?")) onClear(); }}
                className="p-2 bg-[#EF4444]/10 text-[#EF4444] rounded-xl hover:bg-[#EF4444]/20 transition-all duration-200"
                title="Clear all data"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATS.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl border p-5 ${card} transition-all duration-200 hover:shadow-lg`}>
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon size={20} style={{ color }} />
              </div>
              {label === "Total Balance" && (
                <button
                  onClick={() => setShowBalance((v) => !v)}
                  className={`p-1.5 rounded-lg hover:bg-black/5 ${subText}`}
                >
                  {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
            <div className="mt-4">
              <p className={`text-sm ${subText} mb-1`}>{label}</p>
              <p className="font-display font-bold text-2xl" style={{ color: label === "Total Balance" ? color : undefined }}>
                {showBalance || label !== "Total Balance"
                  ? formatNaira(value)
                  : "••••••"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       
        <div className={`rounded-2xl border p-5 ${card}`}>
          <h3 className="font-display font-semibold text-base mb-4">Monthly Overview</h3>
          {monthlyData.length === 0 ? (
            <div className={`flex items-center justify-center h-40 ${subText} text-sm`}>No data available</div>
          ) : (
            <div className="space-y-3">
              {monthlyData.slice(-6).map((m) => (
                <div key={m.month}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={subText}>{m.label}</span>
                    <span className="font-medium text-[#10B981]">+{formatNaira(m.income)} / <span className="text-[#EF4444]">-{formatNaira(m.expense)}</span></span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div
                      className="rounded-full bg-[#10B981] transition-all duration-500"
                      style={{ width: `${(m.income / maxMonthly) * 100}%` }}
                    />
                    <div
                      className="rounded-full bg-[#EF4444] transition-all duration-500"
                      style={{ width: `${(m.expense / maxMonthly) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex gap-4 pt-2">
                <span className="flex items-center gap-1.5 text-xs text-[#6B7280]"><span className="w-3 h-3 rounded-full bg-[#10B981] inline-block" />Income</span>
                <span className="flex items-center gap-1.5 text-xs text-[#6B7280]"><span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block" />Expenses</span>
              </div>
            </div>
          )}
        </div>

      
        <div className={`rounded-2xl border p-5 ${card}`}>
          <h3 className="font-display font-semibold text-base mb-4">Spending by Category</h3>
          {categoryData.length === 0 ? (
            <div className={`flex items-center justify-center h-40 ${subText} text-sm`}>No expense data</div>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {categoryData.map(({ category, amount }) => {
                const pct = totalCatExpense ? Math.round((amount / totalCatExpense) * 100) : 0;
                const color = CATEGORY_COLORS[category] || "#9CA3AF";
                return (
                  <div key={category} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="truncate">{category}</span>
                        <span className={`${subText} ml-2`}>{pct}%</span>
                      </div>
                      <div className={`h-1.5 rounded-full ${darkMode ? "bg-[#334155]" : "bg-[#F3F4F6]"}`}>
                        <div
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium w-24 text-right flex-shrink-0">{formatNaira(amount)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className={`rounded-2xl border p-5 ${card}`}>
        <h3 className="font-display font-semibold text-base mb-4">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <div className={`text-center py-8 ${subText}`}>
            <Wallet size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No transactions yet. Add your first transaction!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? "bg-[#0F172A]" : "bg-[#F9FAFB]"}`}>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ backgroundColor: CATEGORY_COLORS[t.category] || "#9CA3AF" }}
                >
                  {t.category.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.description}</p>
                  <p className={`text-xs ${subText}`}>{t.category} · {t.date}</p>
                </div>
                <p className={`font-semibold text-sm ${t.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                  {t.type === "income" ? "+" : "-"}{formatNaira(t.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <TransactionModal
          onClose={() => setShowModal(false)}
          onSave={(t) => { onAdd(t); setShowModal(false); }}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
