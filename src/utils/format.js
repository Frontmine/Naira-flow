export function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function groupByMonth(transactions) {
  const grouped = {};
  transactions.forEach((t) => {
    const key = t.date.substring(0, 7);
    if (!grouped[key]) grouped[key] = { income: 0, expense: 0 };
    if (t.type === "income") grouped[key].income += t.amount;
    else grouped[key].expense += t.amount;
  });
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      label: new Date(month + "-01").toLocaleDateString("en-NG", { month: "short", year: "2-digit" }),
      ...data,
    }));
}

export function groupByCategory(transactions) {
  const grouped = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      grouped[t.category] = (grouped[t.category] || 0) + t.amount;
    });
  return Object.entries(grouped)
    .sort(([, a], [, b]) => b - a)
    .map(([category, amount]) => ({ category, amount }));
}
