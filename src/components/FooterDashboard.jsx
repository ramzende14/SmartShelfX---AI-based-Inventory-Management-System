import React from "react";
import { useLocation } from "react-router-dom";

const FooterDashboard = () => {
  const location = useLocation();

  // Hide on login/register
  if (location.pathname === "/" || location.pathname === "/register") return null;

  return (
    <footer className="mt-12">

      {/* TOP GRADIENT STRIP */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-700" />

      {/* FOOTER BODY */}
      <div className="bg-white/70 backdrop-blur-xl border-t border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600 gap-2">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-800">
              SmartShelfX
            </span>
          </p>

          <p className="tracking-wide font-medium">
            Smart • Secure • Scalable
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterDashboard;
