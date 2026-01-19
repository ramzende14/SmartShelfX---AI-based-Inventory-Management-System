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
  ChartBarIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
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
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 space-y-6 text-sm">

          {/* DASHBOARD */}
          <button
            onClick={() => navigate("/admin")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/admin")}`}
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
            </div>
          </div>

          {/* STOCK */}
          <div>
            <p className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase">
              Stock
            </p>
            <div className="space-y-1">
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
                Stock History
              </button>
            </div>
          </div>

          {/* PROCUREMENT */}
          <div>
            <p className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase">
              Procurement
            </p>
            <div className="space-y-1">
              <button
                onClick={() => navigate("/po/create")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/po/create")}`}
              >
                <PlusCircleIcon className="w-4 h-4" />
                Create Purchase Order
              </button>

              <button
                onClick={() => navigate("/po")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/po")}`}
              >
                <ClipboardDocumentListIcon className="w-4 h-4" />
                Purchase Orders
              </button>
            </div>
          </div>

          {/* ANALYTICS */}
          <div>
            <p className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase">
              Analytics
            </p>
            <div className="space-y-1">
              <button
                onClick={() => navigate("/analytics/product-sales")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/analytics")}`}
              >
                <ChartBarIcon className="w-4 h-4" />
                Sales Analytics
              </button>
            </div>
          </div>

          {/* ADMINISTRATION */}
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
          Manage inventory, stock movement, procurement, analytics, and users
          from one centralized platform.
        </p>
      </main>
    </div>
  );
};

export default AdminMenu;
