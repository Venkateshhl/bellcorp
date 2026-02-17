# 💰 Bellcorp — Personal Expense Tracker

A secure, full-featured personal finance tracker built with React + Vite.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

### 3. Open in browser
Visit **http://localhost:5173**

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ConfirmDialog.jsx     # Delete confirmation popup
│   ├── MobileNav.jsx         # Bottom nav for mobile
│   ├── Sidebar.jsx           # Desktop side navigation
│   └── TransactionModal.jsx  # Add / Edit transaction form
├── context/
│   ├── AuthContext.jsx        # User login state (global)
│   └── TransactionContext.jsx # Transaction CRUD state (global)
├── hooks/
│   └── useTransactionFilters.js  # Search, filter, pagination logic
├── pages/
│   ├── AuthPage.jsx          # Login & Register
│   ├── Dashboard.jsx         # Summary cards + category chart
│   └── Explorer.jsx          # Searchable transaction list
├── utils/
│   ├── authService.js        # Auth helpers (localStorage)
│   ├── constants.js          # Categories + sample data
│   ├── helpers.js            # fmt(), fmtDate(), uid()
│   └── txService.js          # Transaction CRUD (localStorage)
├── App.jsx                   # Root component + routing
├── index.css                 # Global styles
└── main.jsx                  # React entry point
```

---

## ✨ Features

| Feature | Description |
|---|---|
| Auth | Register / Login / Demo account |
| Protected Routes | Unauthenticated users redirect to login |
| Add / Edit / Delete | Full transaction CRUD with modals |
| Dashboard | Balance, income, expenses, savings rate |
| Category Chart | Donut chart + progress bars |
| Explorer | Search, filter by category/type/date |
| Load More | Paginated list (10 at a time) |
| State Persistence | Filter state saved when browsing detail view |
| Indian Rupees | All amounts in ₹ INR format |
| Mobile Responsive | Bottom nav + responsive layout |

---

## 🔑 Demo Account

Click **"Try Demo Account"** on the login screen — no registration needed.

---

## 🏗 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy to Vercel, Netlify, or Firebase Hosting.
