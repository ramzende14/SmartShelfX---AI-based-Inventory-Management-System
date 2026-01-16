// src/components/FooterAuth.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const FooterAuth = () => {
  const location = useLocation();
  if (location.pathname !== "/" && location.pathname !== "/register") return null;

  return (
    <footer className="mt-16">
      {/* ================= TOP GRADIENT BAR ================= */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-700" />

      {/* ================= MAIN FOOTER ================= */}
      <div className="bg-white/70 backdrop-blur-xl border-t border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm text-gray-700">

          {/* BRAND */}
          <div>
            <h2 className="text-lg font-extrabold bg-gradient-to-r from-blue-600 via-orange-500 to-blue-700 bg-clip-text text-transparent">
              SmartShelfX
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Where inventory meets intelligence.  
              Built to simplify stock management and empower smarter business decisions.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="font-semibold text-blue-700 mb-3">Product</h3>
            <ul className="space-y-2">
              <li>Inventory Tracking</li>
              <li>SKU Management</li>
              <li>Vendor Control</li>
              <li>Role-Based Access</li>
            </ul>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="font-semibold text-blue-700 mb-3">Platform</h3>
            <ul className="space-y-2">
              <li>React Frontend</li>
              <li>Spring Boot Backend</li>
              <li>Secure Authentication</li>
              <li>Scalable Architecture</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold text-blue-700 mb-3">Support</h3>
            <ul className="space-y-2">
              <li>Documentation</li>
              <li>User Guide</li>
              <li>FAQs</li>
              <li>Contact Admin</li>
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-blue-200 bg-blue-100/60">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-blue-700 gap-2">
            <p>© {new Date().getFullYear()} SmartShelfX Inventory System</p>
            <p className="tracking-wide">Smart • Secure • Scalable</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAuth;
