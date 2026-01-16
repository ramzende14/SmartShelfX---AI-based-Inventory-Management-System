import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllProducts, deleteProductById } from "../services/ProductService";
import { getRole } from "../services/LoginService";

const ProductReport = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState({});
  const [loading, setLoading] = useState(true);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const loadAll = async () => {
      try {
        // 🔹 ROLE
        const r = await getRole();
        setRole(r);

        // 🔹 PRODUCTS
        const productRes = await getAllProducts();
        setProducts(productRes.data || []);

        // 🔹 VENDORS (ID → NAME MAP) ✅ STRING KEY FIX
        const vendorRes = await axios.get(
          "http://localhost:8080/invent/vendors"
        );

        const vendorMap = {};
        vendorRes.data.forEach((v) => {
          vendorMap[String(v.id)] = v.name; // 🔥 IMPORTANT FIX
        });
        setVendors(vendorMap);

      } catch (err) {
        console.error("Load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  /* ================= DELETE ================= */
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProductById(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= NAV ================= */
  const returnBack = () => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "MANAGER") navigate("/manager");
    else navigate("/vendor");
  };

  /* ================= HELPERS ================= */
  const stockStatus = (current, reorder) =>
    current <= reorder ? "LOW" : "OK";

  const statusBadge = (status) =>
    status === "LOW"
      ? "bg-red-100 text-red-600"
      : "bg-green-100 text-green-600";

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold">Product Inventory</h2>
            <p className="text-sm text-slate-500">
              Stock, pricing & operations
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={returnBack}
              className="px-4 py-2 border rounded-lg bg-white"
            >
              ← Back
            </button>

            {(role === "ADMIN" || role === "MANAGER") && (
              <button
                onClick={() => navigate("/product/new")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                + Add Product
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[1400px]">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Reorder</th>
                <th className="px-4 py-3">Purchase</th>
                <th className="px-4 py-3">Sale</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center w-[420px]">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={11} className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-10">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => {
                  const status = stockStatus(
                    p.currentStock,
                    p.reorderLevel
                  );

                  return (
                    <tr key={p.id}>
                      <td className="px-4 py-2">{p.id}</td>
                      <td className="px-4 py-2 font-semibold">{p.name}</td>
                      <td className="px-4 py-2">{p.sku}</td>
                      <td className="px-4 py-2">{p.category}</td>

                      {/* ✅ FINAL FIXED VENDOR NAME */}
                      <td className="px-4 py-2 font-medium text-slate-700">
                        {vendors[String(p.vendorId)] || "Unknown Vendor"}
                      </td>

                      <td className="px-4 py-2">{p.currentStock}</td>
                      <td className="px-4 py-2">{p.reorderLevel}</td>
                      <td className="px-4 py-2">₹{p.currentPrice}</td>
                      <td className="px-4 py-2 font-semibold text-green-600">
                        ₹{p.salePrice}
                      </td>

                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${statusBadge(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="px-4 py-2">
                        <div className="flex flex-nowrap gap-2 justify-center">

                          <Link
                            to={`/update-product/${p.id}`}
                            className="px-3 py-1 rounded bg-indigo-600 text-white text-xs"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              navigate(`/transaction/out?productId=${p.id}`)
                            }
                            className="px-3 py-1 rounded bg-orange-500 text-white text-xs"
                          >
                            Issue
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/po/create?productId=${p.id}`)
                            }
                            className="px-3 py-1 rounded bg-emerald-600 text-white text-xs"
                          >
                            Purchase
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/update-price/${p.id}`)
                            }
                            className="px-3 py-1 rounded bg-purple-600 text-white text-xs"
                          >
                            Price Update
                          </button>

                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="px-3 py-1 rounded bg-red-600 text-white text-xs"
                          >
                            Delete
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductReport;
