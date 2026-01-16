import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VendorProductReport = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD VENDOR PRODUCTS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/vendor/products")
      .then((res) => setProducts(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
            <h2 className="text-2xl font-extrabold">
              My Products
            </h2>
            <p className="text-sm text-slate-500">
              Products supplied by you
            </p>
          </div>

          <button
            onClick={() => navigate("/vendor")}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            ← Back
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[1200px]">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Reorder</th>
                <th className="px-4 py-3">Purchase</th>
                <th className="px-4 py-3">Sale</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10">
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

export default VendorProductReport;
