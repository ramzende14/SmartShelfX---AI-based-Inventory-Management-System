import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  RectangleGroupIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  TruckIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const VendorMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const vendorId = localStorage.getItem("userId");

  const [stats, setStats] = useState({
    pending: 0,
    dispatched: 0,
    completed: 0,
    products: 0,
  });

  /* ================= ACTIVE MENU ================= */
  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-blue-50 text-blue-600 font-semibold"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  /* ================= LOAD DASHBOARD DATA ================= */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/purchase-orders/vendor/${vendorId}`
      );

      const orders = res.data;

      setStats({
        pending: orders.filter((o) => o.status === "PENDING").length,
        dispatched: orders.filter((o) => o.status === "DISPATCHED").length,
        completed: orders.filter((o) => o.status === "COMPLETED").length,
        products: [...new Set(orders.map((o) => o.product?.id))].length,
      });
    } catch (err) {
      console.error("Error loading vendor dashboard", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">

        {/* BRAND */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3">
          <CubeIcon className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-lg font-extrabold">SmartShelfX</h1>
            <p className="text-xs text-slate-500">Vendor Dashboard</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 space-y-6 text-sm">

          <button
            onClick={() => navigate("/vendor")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/vendor")}`}
          >
            <RectangleGroupIcon className="w-5 h-5" />
            Dashboard
          </button>

          <div>
            <p className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase">
              Supply Management
            </p>

            <div className="space-y-1">
              <button
                onClick={() => navigate("/vendor/po")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/vendor/po")}`}
              >
                <ClipboardDocumentListIcon className="w-4 h-4" />
                Purchase Orders
              </button>

              <button
                onClick={() => navigate("/vendor/products")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/vendor/products")}`}
              >
                <CubeIcon className="w-4 h-4" />
                My Products
              </button>

              <button
                onClick={() => navigate("/vendor/notifications")}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("/vendor/notifications")}`}
              >
                <BellIcon className="w-4 h-4" />
                Notifications
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
          Welcome, Vendor 👋
        </h1>
        <p className="text-slate-600 max-w-2xl mb-8">
          Manage purchase orders, track deliveries, and monitor your supply performance.
        </p>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold">📄 Pending Orders</h3>
            <p className="text-3xl font-bold mt-2 text-blue-600">
              {stats.pending}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold">🚚 Dispatched</h3>
            <p className="text-3xl font-bold mt-2 text-orange-500">
              {stats.dispatched}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold">✅ Completed</h3>
            <p className="text-3xl font-bold mt-2 text-emerald-600">
              {stats.completed}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold">📦 My Products</h3>
            <p className="text-3xl font-bold mt-2 text-purple-600">
              {stats.products}
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default VendorMenu;
