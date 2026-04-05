import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { loadFromStorage, saveToStorage } from "./utils/storage";
import { mockTransactions } from "./data/mockData";

const TABS = ["dashboard", "transactions", "insights"];

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [role, setRole] = useState(() => localStorage.getItem("role") || "admin");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate mock API fetch
    setTimeout(() => {
      const saved = loadFromStorage("transactions");
      if (saved) {
        setTransactions(saved);
      } else {
        setTransactions(mockTransactions);
        saveToStorage("transactions", mockTransactions);
      }
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (!loading) saveToStorage("transactions", transactions);
  }, [transactions, loading]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  const addTransaction = (t) => setTransactions((prev) => [{ ...t, id: Date.now().toString() }, ...prev]);
  const editTransaction = (id, updated) =>
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  const deleteTransaction = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id));
  const clearAll = () => { setTransactions([]); saveToStorage("transactions", []); };

  const theme = darkMode
    ? "bg-[#0F172A] text-[#E5E7EB]"
    : "bg-[#F9FAFB] text-[#111827]";

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 ${theme}`}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#6B7280] font-medium">Loading your finances…</p>
          </div>
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(t) => { setActiveTab(t); setSidebarOpen(false); }}
            darkMode={darkMode}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              role={role}
              setRole={setRole}
              onMenuClick={() => setSidebarOpen(true)}
              activeTab={activeTab}
            />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              {activeTab === "dashboard" && (
                <Dashboard
                  transactions={transactions}
                  darkMode={darkMode}
                  role={role}
                  onAdd={addTransaction}
                  onClear={clearAll}
                />
              )}
              {activeTab === "transactions" && (
                <Transactions
                  transactions={transactions}
                  darkMode={darkMode}
                  role={role}
                  onAdd={addTransaction}
                  onEdit={editTransaction}
                  onDelete={deleteTransaction}
                />
              )}
              {activeTab === "insights" && (
                <Insights transactions={transactions} darkMode={darkMode} />
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
