import { useState } from "react";
import { X } from "lucide-react";
import { CATEGORIES } from "../data/mockData";

export default function TransactionModal({ onClose, onSave, darkMode, initial }) {
  const [form, setForm] = useState(
    initial || { description: "", amount: "", type: "expense", category: "Food & Dining", date: new Date().toISOString().split("T")[0] }
  );
  const [error, setError] = useState("");

  const overlay = "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm";
  const card = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";
  const input = darkMode
    ? "bg-[#0F172A] border-[#334155] text-[#E5E7EB] focus:border-[#1E3A8A]"
    : "bg-[#F9FAFB] border-[#E5E7EB] text-[#111827] focus:border-[#1E3A8A]";
  const label = darkMode ? "text-[#94A3B8]" : "text-[#6B7280]";

  const handleSubmit = () => {
    if (!form.description.trim()) return setError("Description is required");
    const amt = parseFloat(form.amount);
    if (!amt || amt <= 0) return setError("Enter a valid amount");
    if (!form.date) return setError("Date is required");
    setError("");
    onSave({ ...form, amount: amt });
  };

  return (
    <div className={overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`w-full max-w-md rounded-2xl border shadow-2xl animate-slide-up ${card}`}
        style={{ animation: "slideUp 0.25s ease-out" }}
      >
        <div className="flex items-center justify-between p-5 border-b border-inherit">
          <h2 className="font-display font-bold text-lg">{initial ? "Edit Transaction" : "New Transaction"}</h2>
          <button onClick={onClose} className={`p-2 rounded-xl hover:bg-black/5 ${label}`}>
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <div className="bg-[#EF4444]/10 text-[#EF4444] text-sm px-4 py-2 rounded-xl">{error}</div>
          )}

         
          <div>
            <label className={`text-xs font-medium ${label} block mb-2`}>Transaction Type</label>
            <div className={`flex gap-2 p-1 rounded-xl ${darkMode ? "bg-[#0F172A]" : "bg-[#F3F4F6]"}`}>
              {["income", "expense"].map((t) => (
                <button
                  key={t}
                  onClick={() => setForm((f) => ({ ...f, type: t }))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                    form.type === t
                      ? t === "income"
                        ? "bg-[#10B981] text-white shadow-sm"
                        : "bg-[#EF4444] text-white shadow-sm"
                      : `${label} hover:bg-white/20`
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`text-xs font-medium ${label} block mb-1.5`}>Description</label>
            <input
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${input}`}
              placeholder="e.g. Monthly Salary"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-xs font-medium ${label} block mb-1.5`}>Amount (₦)</label>
              <input
                type="number"
                min="0"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${input}`}
                placeholder="0"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              />
            </div>
            <div>
              <label className={`text-xs font-medium ${label} block mb-1.5`}>Date</label>
              <input
                type="date"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${input}`}
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className={`text-xs font-medium ${label} block mb-1.5`}>Category</label>
            <select
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${input}`}
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 p-5 border-t border-inherit">
          <button
            onClick={onClose}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${darkMode ? "border-[#334155] hover:bg-[#334155]" : "border-[#E5E7EB] hover:bg-[#F9FAFB]"}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[#1E3A8A] text-white hover:bg-[#1e40af] transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {initial ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
