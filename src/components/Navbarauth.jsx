// src/components/NavbarAuth.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/Logo.png";

const NavbarAuth = () => {
  const location = useLocation();

  // Show only on login & register
  if (location.pathname !== "/" && location.pathname !== "/register")
    return null;

  return (
    <header className="sticky top-0 z-50">

      {/* 🔥 TOP GRADIENT STRIP (SAME AS DASHBOARD & FOOTER) */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-700" />

      {/* NAVBAR BODY */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LEFT: BRAND */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* LOGO */}
            <div className="relative">
              <img
                src={logo}
                alt="SmartShelfX Logo"
                className="
                  h-11 w-11 object-contain
                  transition-transform duration-500
                  group-hover:rotate-6
                  group-hover:scale-110
                "
              />
              <div className="
                absolute inset-0 rounded-full
                bg-blue-500 opacity-0
                group-hover:opacity-20
                blur-xl transition duration-500
              " />
            </div>

            {/* BRAND NAME */}
            <div className="leading-tight">
              <h1 className="text-2xl font-extrabold tracking-wide text-slate-800">
                SmartShelfX
              </h1>
              <p className="text-xs text-slate-500">
                Inventory Intelligence Platform
              </p>
            </div>
          </Link>

          {/* RIGHT: TAGLINE */}
          <span className="hidden sm:block text-sm font-medium text-slate-600 tracking-wide">
            Smart • Secure • Scalable
          </span>
        </div>
      </div>
    </header>
  );
};

export default NavbarAuth;
