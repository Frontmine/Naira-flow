# NairaFlow – Finance Dashboard

A clean, responsive personal finance tracking dashboard built with React and Tailwind CSS, using Nigerian Naira (₦) as currency.

---

## Features

- **Dashboard Overview** – Total Balance, Income, Expenses with hide/show toggle
- **Monthly Bar Chart** – Visual income vs. expense comparison by month
- **Category Spending Breakdown** – Progress bars per category
- **Transactions Page** – Full list with search, filter, sort, and group-by-month
- **Insights Page** – Savings rate, monthly comparison table, top spending category
- **Role-Based UI** – Admin (add/edit/delete) and Viewer (read-only) modes
- **Dark Mode** – Full dark theme toggle
- **Local Storage** – Data persists across browser refreshes
- **Mock API Simulation** – Simulated fetch on app load
- **Responsive** – Works on mobile (Android) and desktop

---

## 🛠 Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Frontend    | React 18            |
| Styling     | Tailwind CSS v3     |
| Icons       | Lucide React        |
| Build Tool  | Vite                |
| Storage     | localStorage (browser) |
| Fonts       | Sora + DM Sans (Google Fonts) |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Steps

bash

cd nairaflow-finance-dashboard

npm install

npm run dev




### Build for Production
```bash
npm run build
npm run preview
```

---

## 🔐 Role-Based UI

The app simulates two user roles via a toggle in the header:

| Role    | Permissions                                     |
|---------|-------------------------------------------------|
| Admin   | View + Add + Edit + Delete transactions         |
| Viewer  | View only — all mutation buttons are hidden     |

Role is saved in `localStorage` and persists across sessions.

---

## 💾 Local Storage Usage

| Key            | Value              | Purpose                          |
|----------------|--------------------|----------------------------------|
| `transactions` | JSON array         | Persists all transaction data    |
| `darkMode`     | `"true"/"false"`   | Persists theme preference        |
| `role`         | `"admin"/"viewer"` | Persists current role            |

### Data Safety
- On load: tries `JSON.parse`, validates it's an array
- If corrupted: silently removes the bad key and loads mock data
- If empty: shows friendly empty state messages

---

## 💡 Assumptions

1. Authentication is simulated — role switching is manual, not server-enforced
2. Currency is Nigerian Naira (₦) using `Intl.NumberFormat` with `NGN` locale
3. Mock data is seeded once on first load if no saved data is found
4. No backend — all data lives in the browser's localStorage
5. Charts are built with pure CSS/Tailwind (no chart library dependency)

---

## 🎨 Color Palette

| Token       | Light Mode  | Dark Mode   |
|-------------|-------------|-------------|
| Primary     | `#1E3A8A`   | `#1E3A8A`   |
| Success     | `#10B981`   | `#10B981`   |
| Danger      | `#EF4444`   | `#EF4444`   |
| Accent      | `#F59E0B`   | `#F59E0B`   |
| Background  | `#F9FAFB`   | `#0F172A`   |
| Card        | `#FFFFFF`   | `#1E293B`   |
| Text        | `#111827`   | `#E5E7EB`   |



