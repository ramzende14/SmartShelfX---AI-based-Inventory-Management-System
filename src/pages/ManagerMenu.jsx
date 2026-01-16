// src/pages/ManagerMenu.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  RectangleGroupIcon,
  TagIcon,
  CubeIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const ManagerMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-blue-50 text-blue-600 font-semibold"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">

        {/* BRAND */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3">
          <CubeIcon className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-lg font-extrabold">SmartShelfX</h1>
            <p className="text-xs text-slate-500">Manager Panel</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 space-y-6 text-sm">

          {/* DASHBOARD */}
          <button
            onClick={() => navigate("/manager")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/manager")}`}
          >
            <RectangleGroupIcon className="w-5 h-5" />
            Dashboard
          </button>

          {/* INVENTORY */}
          <div>
            <p className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase">
              Inventory
            </p>

            <div className="space-y-1">
              <button
                onClick={() => navigate("/sku")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/sku")}`}
              >
                <TagIcon className="w-4 h-4" />
                SKU List
              </button>

              <button
                onClick={() => navigate("/product")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/product")}`}
              >
                <CubeIcon className="w-4 h-4" />
                Product List
              </button>
            </div>
          </div>

          {/* STOCK */}
          <div>
            <p className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase">
              Stock Operations
            </p>

            <div className="space-y-1">
              <button
                onClick={() => navigate("/transaction/in")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/transaction/in")}`}
              >
                <ArrowsRightLeftIcon className="w-4 h-4" />
                Stock In
              </button>

              <button
                onClick={() => navigate("/transaction/out")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/transaction/out")}`}
              >
                <ArrowsRightLeftIcon className="w-4 h-4" />
                Stock Out
              </button>

              <button
                onClick={() => navigate("/transaction")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/transaction")}`}
              >
                <ChartBarIcon className="w-4 h-4" />
                Transactions
              </button>
            </div>
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="px-6 py-4 border-t border-slate-200">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-semibold"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold mb-2">
          Welcome, Manager 👋
        </h1>
        <p className="text-slate-600 max-w-2xl mb-8">
          Monitor inventory levels, manage stock movements, and track
          transactions in real time.
        </p>

        {/* QUICK CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold mb-1">📦 Inventory Status</h3>
            <p className="text-sm text-slate-500">
              View current stock levels
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold mb-1">🔄 Stock Movement</h3>
            <p className="text-sm text-slate-500">
              Manage stock in & out
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold mb-1">📊 Reports</h3>
            <p className="text-sm text-slate-500">
              Transaction & inventory reports
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerMenu;
