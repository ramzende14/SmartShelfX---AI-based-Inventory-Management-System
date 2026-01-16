// src/pages/AdminMenu.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CubeIcon,
  ArrowRightOnRectangleIcon,
  RectangleGroupIcon,
  TagIcon,
  ShoppingBagIcon,
  ArrowsRightLeftIcon,
  UsersIcon,
  BellAlertIcon,
  ChartBarIcon,
  CpuChipIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon, // ✅ ADDED
} from "@heroicons/react/24/outline";

const AdminMenu = () => {
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
            <h1 className="text-lg font-extrabold text-slate-800">
              SmartShelfX
            </h1>
            <p className="text-xs text-slate-500">
              Admin Panel
            </p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 space-y-6 text-sm">

          {/* DASHBOARD */}
          <button
            onClick={() => navigate("/admin")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive("/admin")}`}
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
                SKU Management
              </button>

              <button
                onClick={() => navigate("/product")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/product")}`}
              >
                <ShoppingBagIcon className="w-4 h-4" />
                Product Catalog
              </button>

              <button
                onClick={() => navigate("/product/import")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/product/import")}`}
              >
                <ClipboardDocumentListIcon className="w-4 h-4" />
                Bulk Import
              </button>
            </div>
          </div>

          {/* STOCK */}
          <div>
            <p className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase">
              Stock
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
                History
              </button>
            </div>
          </div>

          {/* AI & PROCUREMENT */}
          <div>
            <p className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase">
              Intelligence
            </p>
            <div className="space-y-1">
              <button
                onClick={() => navigate("/forecast")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/forecast")}`}
              >
                <CpuChipIcon className="w-4 h-4" />
                AI Forecast
              </button>
              <button
  onClick={() => navigate("/analytics/product-sales")}
  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/analytics")}`}
>
  <ChartBarIcon className="w-4 h-4" />
  Sales Analytics
</button>


              {/* ✅ ADDED: CREATE PURCHASE ORDER */}
              <button
                onClick={() => navigate("/po/create")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/po/create")}`}
              >
                <PlusCircleIcon className="w-4 h-4" />
                Create Purchase Order
              </button>

              {/* EXISTING */}
              <button
                onClick={() => navigate("/po")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/po")}`}
              >
                <ClipboardDocumentListIcon className="w-4 h-4" />
                Purchase Orders
              </button>
            </div>
          </div>

          {/* ADMIN */}
          <div>
            <p className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase">
              Administration
            </p>
            <div className="space-y-1">
              <button
                onClick={() => navigate("/users")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/users")}`}
              >
                <UsersIcon className="w-4 h-4" />
                Users
              </button>

              <button
                onClick={() => navigate("/alerts")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/alerts")}`}
              >
                <BellAlertIcon className="w-4 h-4" />
                Alerts
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
          Welcome, Admin 👋
        </h1>
        <p className="text-slate-600 max-w-2xl mb-8">
          Manage inventory, users, AI forecasts, and auto-restocking from a
          single intelligent platform.
        </p>

        {/* CARDS (UNCHANGED) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold mb-1">📦 Inventory Health</h3>
            <p className="text-sm text-slate-500">
              Real-time stock monitoring
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold mb-1">🤖 AI Forecast</h3>
            <p className="text-sm text-slate-500">
              Predict demand & stock risks
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold mb-1">🛒 Auto Restock</h3>
            <p className="text-sm text-slate-500">
              Smart purchase recommendations
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMenu;
