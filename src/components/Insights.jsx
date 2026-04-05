import { useMemo } from "react";
import { TrendingUp, TrendingDown, Award, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { formatNaira, groupByMonth, groupByCategory } from "../utils/format";
import { CATEGORY_COLORS } from "../data/mockData";

export default function Insights({ transactions, darkMode }) {
  const card = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";
  const subText = darkMode ? "text-[#94A3B8]" : "text-[#6B7280]";

  const monthlyData = useMemo(() => groupByMonth(transactions), [transactions]);
  const categoryData = useMemo(() => groupByCategory(transactions), [transactions]);

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const savingsRate = totalIncome ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;

  const topCategory = categoryData[0];
  const lastTwoMonths = monthlyData.slice(-2);
  const prevMonth = lastTwoMonths[0];
  const currMonth = lastTwoMonths[1];
  const expenseChange = prevMonth && currMonth
    ? Math.round(((currMonth.expense - prevMonth.expense) / (prevMonth.expense || 1)) * 100)
    : null;

  const insights = [];
  if (topCategory) {
    insights.push({
      type: "warning",
      icon: Award,
      title: "Highest Spending Category",
      message: `You spent the most on ${topCategory.category} — ${formatNaira(topCategory.amount)} total.`,
      color: "#F59E0B",
    });
  }
  if (expenseChange !== null) {
    insights.push({
      type: expenseChange > 0 ? "danger" : "success",
      icon: expenseChange > 0 ? TrendingUp : TrendingDown,
      title: "Monthly Expense Trend",
      message: expenseChange > 0
        ? `Expenses increased by ${expenseChange}% compared to last month.`
        : `Great! Expenses decreased by ${Math.abs(expenseChange)}% compared to last month.`,
      color: expenseChange > 0 ? "#EF4444" : "#10B981",
    });
  }
  if (savingsRate >= 20) {
    insights.push({ type: "success", icon: CheckCircle, title: "Good Savings Rate", message: `You're saving ${savingsRate}% of your income. Keep it up!`, color: "#10B981" });
  } else if (savingsRate < 20 && totalIncome > 0) {
    insights.push({ type: "warning", icon: AlertTriangle, title: "Low Savings Rate", message: `Your savings rate is ${savingsRate}%. Try to aim for at least 20%.`, color: "#F59E0B" });
  }
  if (totalIncome === 0 && totalExpense === 0) {
    insights.push({ type: "info", icon: Info, title: "No Data", message: "Add transactions to see financial insights here.", color: "#6B7280" });
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display font-bold text-xl">Financial Insights</h2>
        <p className={`text-sm ${subText}`}>Analysis of your spending patterns</p>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Savings Rate", value: `${savingsRate}%`, color: savingsRate >= 20 ? "#10B981" : "#F59E0B" },
          { label: "Avg Monthly Spend", value: formatNaira(monthlyData.length ? Math.round(monthlyData.reduce((s, m) => s + m.expense, 0) / monthlyData.length) : 0), color: "#EF4444" },
          { label: "Avg Monthly Income", value: formatNaira(monthlyData.length ? Math.round(monthlyData.reduce((s, m) => s + m.income, 0) / monthlyData.length) : 0), color: "#10B981" },
          { label: "Total Transactions", value: transactions.length, color: "#1E3A8A" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-2xl border p-4 ${card}`}>
            <p className={`text-xs ${subText} mb-2`}>{label}</p>
            <p className="font-display font-bold text-xl" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map(({ title, message, icon: Icon, color }, i) => (
          <div key={i} className={`rounded-2xl border p-5 ${card} flex gap-4`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + "20" }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <p className="font-semibold text-sm">{title}</p>
              <p className={`text-sm mt-1 ${subText}`}>{message}</p>
            </div>
          </div>
        ))}
      </div>

      
      {monthlyData.length > 0 && (
        <div className={`rounded-2xl border ${card} overflow-hidden`}>
          <div className="p-5 border-b border-inherit">
            <h3 className="font-display font-semibold">Monthly Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`${darkMode ? "bg-[#0F172A]" : "bg-[#F9FAFB]"}`}>
                  <th className={`text-left px-5 py-3 text-xs font-semibold ${subText}`}>Month</th>
                  <th className={`text-right px-5 py-3 text-xs font-semibold ${subText}`}>Income</th>
                  <th className={`text-right px-5 py-3 text-xs font-semibold ${subText}`}>Expenses</th>
                  <th className={`text-right px-5 py-3 text-xs font-semibold ${subText}`}>Net</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.slice(-6).reverse().map((m, i) => {
                  const net = m.income - m.expense;
                  return (
                    <tr key={m.month} className={`border-t ${darkMode ? "border-[#334155]" : "border-[#F3F4F6]"} ${i % 2 === 0 ? "" : darkMode ? "bg-[#0F172A]/40" : "bg-[#F9FAFB]/60"}`}>
                      <td className="px-5 py-3 font-medium">{m.label}</td>
                      <td className="px-5 py-3 text-right text-[#10B981] font-medium">{formatNaira(m.income)}</td>
                      <td className="px-5 py-3 text-right text-[#EF4444] font-medium">{formatNaira(m.expense)}</td>
                      <td className={`px-5 py-3 text-right font-bold ${net >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                        {net >= 0 ? "+" : ""}{formatNaira(net)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      
      {categoryData.length > 0 && (
        <div className={`rounded-2xl border p-5 ${card}`}>
          <h3 className="font-display font-semibold mb-4">Full Category Breakdown</h3>
          <div className="space-y-3">
            {categoryData.map(({ category, amount }) => {
              const pct = totalExpense ? Math.round((amount / totalExpense) * 100) : 0;
              const color = CATEGORY_COLORS[category] || "#9CA3AF";
              return (
                <div key={category} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium truncate">{category}</span>
                      <span className={subText}>{pct}%</span>
                    </div>
                    <div className={`h-2 rounded-full ${darkMode ? "bg-[#334155]" : "bg-[#F3F4F6]"}`}>
                      <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold w-28 text-right flex-shrink-0">{formatNaira(amount)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
