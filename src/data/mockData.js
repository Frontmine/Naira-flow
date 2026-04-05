export const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Housing",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Education",
  "Utilities",
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

export const CATEGORY_COLORS = {
  "Food & Dining": "#EF4444",
  "Transport": "#F59E0B",
  "Housing": "#1E3A8A",
  "Entertainment": "#8B5CF6",
  "Healthcare": "#10B981",
  "Shopping": "#EC4899",
  "Education": "#06B6D4",
  "Utilities": "#6B7280",
  "Salary": "#10B981",
  "Freelance": "#3B82F6",
  "Investment": "#F59E0B",
  "Other": "#9CA3AF",
};

function randDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

export const mockTransactions = [
  { id: "1", date: randDate(0), description: "Monthly Salary", amount: 450000, type: "income", category: "Salary" },
  { id: "2", date: randDate(1), description: "Grocery Shopping", amount: 18500, type: "expense", category: "Food & Dining" },
  { id: "3", date: randDate(2), description: "Netflix Subscription", amount: 4400, type: "expense", category: "Entertainment" },
  { id: "4", date: randDate(3), description: "Uber Ride", amount: 3200, type: "expense", category: "Transport" },
  { id: "5", date: randDate(4), description: "Freelance Project", amount: 85000, type: "income", category: "Freelance" },
  { id: "6", date: randDate(5), description: "Electricity Bill", amount: 12000, type: "expense", category: "Utilities" },
  { id: "7", date: randDate(6), description: "Restaurant Dinner", amount: 8700, type: "expense", category: "Food & Dining" },
  { id: "8", date: randDate(8), description: "Rent Payment", amount: 75000, type: "expense", category: "Housing" },
  { id: "9", date: randDate(10), description: "Online Course", amount: 15000, type: "expense", category: "Education" },
  { id: "10", date: randDate(12), description: "Investment Return", amount: 22000, type: "income", category: "Investment" },
  { id: "11", date: randDate(14), description: "Pharmacy", amount: 5500, type: "expense", category: "Healthcare" },
  { id: "12", date: randDate(15), description: "Clothing Store", amount: 23000, type: "expense", category: "Shopping" },
  { id: "13", date: randDate(18), description: "Bonus Payment", amount: 120000, type: "income", category: "Salary" },
  { id: "14", date: randDate(20), description: "Internet Bill", amount: 8000, type: "expense", category: "Utilities" },
  { id: "15", date: randDate(22), description: "Fuel", amount: 15000, type: "expense", category: "Transport" },
  { id: "16", date: randDate(25), description: "Dental Checkup", amount: 12000, type: "expense", category: "Healthcare" },
  { id: "17", date: randDate(28), description: "Book Purchase", amount: 4500, type: "expense", category: "Education" },
  { id: "18", date: randDate(30), description: "Consulting Fee", amount: 60000, type: "income", category: "Freelance" },
  { id: "19", date: randDate(32), description: "Cinema Tickets", amount: 6000, type: "expense", category: "Entertainment" },
  { id: "20", date: randDate(35), description: "Groceries", amount: 21000, type: "expense", category: "Food & Dining" },
  { id: "21", date: randDate(38), description: "Water Bill", amount: 3500, type: "expense", category: "Utilities" },
  { id: "22", date: randDate(40), description: "Shoes Purchase", amount: 18000, type: "expense", category: "Shopping" },
  { id: "23", date: randDate(42), description: "Stock Dividend", amount: 35000, type: "income", category: "Investment" },
  { id: "24", date: randDate(45), description: "Airtime Recharge", amount: 2000, type: "expense", category: "Other" },
  { id: "25", date: randDate(48), description: "Monthly Salary", amount: 450000, type: "income", category: "Salary" },
];
