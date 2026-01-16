import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

/* ===================== NAVBARS & FOOTERS ===================== */
import NavbarAuth from "./components/Navbarauth";
import FooterAuth from "./components/FooterAuth";
import NavbarDashboard from "./components/NavbarDashboard";
import FooterDashboard from "./components/FooterDashboard";

/* ===================== AUTH ===================== */
import LoginPage from "./pages/LoginPage";
import RegisterUser from "./pages/RegisterUser";

/* ===================== DASHBOARDS ===================== */
import AdminMenu from "./pages/AdminMenu";
import ManagerMenu from "./pages/ManagerMenu";
import VendorMenu from "./pages/VendorMenu";

/* ===================== PRODUCTS ===================== */
import ProductEntry from "./pages/ProductEntry";
import ProductReport from "./pages/ProductReport";
import VendorProductReport from "./pages/VendorProductReport";
import UpdateProduct from "./pages/UpdateProduct";
import UpdatePurchasePrice from "./pages/UpdatePurchasePrice";

/* ===================== SKU ===================== */
import SKUEntry from "./pages/SKUEntry";
import SKUReport from "./pages/SKUReport";
import UpdateSKU from "./pages/UpdateSKU";

/* ===================== STOCK ===================== */
import StockOut from "./pages/StockOut";
import TransactionReport from "./pages/TransactionReport";

/* ===================== USERS ===================== */
import UserReport from "./pages/UserReport";

/* ===================== PURCHASE ORDERS ===================== */
import VendorPurchaseOrders from "./pages/VendorPurchaseOrder";
import AllPurchaseOrders from "./pages/AllPurchaseOrders";
import EditPurchaseOrder from "./pages/EditPurchaseOrder";
import CreatePurchaseOrder from "./pages/CreatePurchaseOrder";

/* ===================== ANALYTICS ===================== */
import ProductPieAnalysis from "./pages/ProductPieAnalysis";

/* ===================== SECURITY ===================== */
import ProtectedRoute from "./components/ProtectedRoute";

/* ============================================================= */

const App = () => {
  const location = useLocation();

  const isAuth =
    location.pathname === "/" ||
    location.pathname === "/register";

  return (
    <>
      {/* ===================== TOP NAVBAR ===================== */}
      {isAuth ? <NavbarAuth /> : <NavbarDashboard />}

      {/* ===================== ROUTING ===================== */}
      <Routes>

        {/* ===================== AUTH ===================== */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* ===================== DASHBOARDS ===================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminMenu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerMenu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor"
          element={
            <ProtectedRoute allowedRoles={["VENDOR"]}>
              <VendorMenu />
            </ProtectedRoute>
          }
        />

        {/* ===================== USERS ===================== */}
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <UserReport />
            </ProtectedRoute>
          }
        />

        {/* ===================== PRODUCTS ===================== */}
        <Route
          path="/product"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <ProductReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/products"
          element={
            <ProtectedRoute allowedRoles={["VENDOR"]}>
              <VendorProductReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/new"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <ProductEntry />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-product/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-price/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <UpdatePurchasePrice />
            </ProtectedRoute>
          }
        />

        {/* ===================== SKU ===================== */}
        <Route
          path="/sku"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER", "VENDOR"]}>
              <SKUReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sku/new"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <SKUEntry />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-sku/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <UpdateSKU />
            </ProtectedRoute>
          }
        />

        {/* ===================== STOCK ===================== */}
        <Route
          path="/transaction"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <TransactionReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transaction/out"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <StockOut />
            </ProtectedRoute>
          }
        />

        {/* ===================== PURCHASE ORDERS ===================== */}
        <Route
          path="/po/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <CreatePurchaseOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/po"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <AllPurchaseOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/po/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <EditPurchaseOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/po"
          element={
            <ProtectedRoute allowedRoles={["VENDOR", "ADMIN"]}>
              <VendorPurchaseOrders />
            </ProtectedRoute>
          }
        />

        {/* ===================== 📊 SALES ANALYTICS ===================== */}
        <Route
          path="/analytics/product-sales"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <ProductPieAnalysis />
            </ProtectedRoute>
          }
        />

        {/* ===================== FALLBACK ===================== */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

      {/* ===================== FOOTER ===================== */}
      {isAuth ? <FooterAuth /> : <FooterDashboard />}
    </>
  );
};

export default App;
