import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  CubeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const NavbarDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 FIX 1: ROLE NORMALIZATION (MOST IMPORTANT)
  const role = (localStorage.getItem("role") || "")
    .trim()
    .toUpperCase();

  // Hide navbar on auth pages
  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path
        ? "text-blue-600 font-semibold border-b-2 border-blue-600"
        : "text-slate-600 hover:text-blue-600";
    }

    return location.pathname.startsWith(path)
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "text-slate-600 hover:text-blue-600";
  };

  // 🔥 FIX 2: FORCE HARD NAVIGATION (REACT CACHE ISSUE)
  const forceNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <header className="sticky top-0 z-50">
      {/* TOP STRIP */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-700" />

      <div className="bg-white/70 backdrop-blur-xl border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

          {/* BRAND */}
          <div className="flex items-center gap-3">
            <CubeIcon className="w-7 h-7 text-blue-600" />
            <div>
              <h1 className="font-extrabold text-slate-800">
                SmartShelfX
              </h1>
              <p className="text-xs text-slate-500">
                {role} Dashboard
              </p>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="flex gap-6 text-sm font-medium">

            {role === "ADMIN" && (
              <>
                <Link to="/admin" className={isActive("/admin", true)}>
                  Dashboard
                </Link>

                <Link to="/sku" className={isActive("/sku")}>
                  SKU
                </Link>

                <Link to="/product" className={isActive("/product")}>
                  Products
                </Link>

                <Link
                  to="/transaction"
                  onClick={() => forceNavigate("/transaction")}
                  className={isActive("/transaction")}
                >
                  Stock
                </Link>

                {/* 🔥 CRITICAL FIX FOR PO */}
                <Link
                  to="/po"
                  onClick={() => forceNavigate("/po")}
                  className={isActive("/po")}
                >
                  Purchase Orders
                </Link>

                <Link to="/users" className={isActive("/users")}>
                  Users
                </Link>
              </>
            )}

            {role === "MANAGER" && (
              <>
                <Link to="/manager" className={isActive("/manager", true)}>
                  Dashboard
                </Link>

                <Link to="/product" className={isActive("/product")}>
                  Products
                </Link>

                <Link
                  to="/transaction"
                  onClick={() => forceNavigate("/transaction")}
                  className={isActive("/transaction")}
                >
                  Stock
                </Link>

                {/* 🔥 CRITICAL FIX FOR PO */}
                <Link
                  to="/po"
                  onClick={() => forceNavigate("/po")}
                  className={isActive("/po")}
                >
                  Purchase Orders
                </Link>
              </>
            )}

            {role === "VENDOR" && (
              <>
                <Link to="/vendor" className={isActive("/vendor", true)}>
                  Dashboard
                </Link>

                <Link
                  to="/vendor/products"
                  className={isActive("/vendor/products")}
                >
                  My Products
                </Link>

                <Link
                  to="/vendor/po"
                  onClick={() => forceNavigate("/vendor/po")}
                  className={isActive("/vendor/po")}
                >
                  Purchase Orders
                </Link>
              </>
            )}
          </nav>

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 
                       text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            Logout
          </button>

        </div>
      </div>
    </header>
  );
};

export default NavbarDashboard;
