import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllPOs,
  completePO,
  deletePO,
} from "../services/PurchaseOrderService";

const AllPurchaseOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD PURCHASE ORDERS ================= */
  const loadPOs = async () => {
    try {
      setLoading(true);
      const res = await getAllPOs();
      setOrders(res.data || []);
    } catch (err) {
      console.error("LOAD PO ERROR", err);
      alert("Failed to load purchase orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPOs();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (poId) => {
    if (!window.confirm("Are you sure you want to delete this PO?")) return;

    try {
      await deletePO(poId);
      await loadPOs();
    } catch (err) {
      console.error("DELETE PO ERROR", err);
      alert("Delete failed");
    }
  };

  /* ================= COMPLETE ================= */
  const handleComplete = async (poId) => {
    if (!window.confirm("Mark this PO as COMPLETED?")) return;

    try {
      await completePO(poId);
      await loadPOs();
    } catch (err) {
      console.error("COMPLETE PO ERROR", err);
      alert("Failed to complete purchase order");
    }
  };

  /* ================= STATUS NORMALIZER ================= */
  const normalizeStatus = (status) =>
    status ? status.trim().toUpperCase() : "";

  /* ================= STATUS BADGE ================= */
  const statusBadge = (status) => {
    switch (normalizeStatus(status)) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "APPROVED":
        return "bg-blue-100 text-blue-700";
      case "DISPATCHED":
        return "bg-orange-100 text-orange-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">
              Purchase Transactions
            </h2>
            <p className="text-sm text-slate-500">
              Track stock purchases and vendor transactions
            </p>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
          >
            ← Back
          </button>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

          {loading ? (
            <div className="py-16 text-center text-slate-400">
              Loading purchase transactions...
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              No purchase orders found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b text-slate-600">
                  <tr>
                    <th className="px-4 py-3 text-left">PO No</th>
                    <th className="px-4 py-3 text-left">Vendor</th>
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Product ID</th>
                    <th className="px-4 py-3 text-left">SKU</th>
                    <th className="px-4 py-3 text-right">Qty</th>
                    <th className="px-4 py-3 text-right">Rate (₹)</th>
                    <th className="px-4 py-3 text-right">Total (₹)</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {orders.map((po) => {
                    const qty = po.quantity || 0;
                    const rate =
                      po.rate || po.product?.currentPrice || 0;
                    const total = rate * qty;
                    const status = normalizeStatus(po.status);

                    return (
                      <tr
                        key={po.id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-3 font-mono font-semibold text-indigo-700">
                          {po.poNumber || po.id}
                        </td>

                        <td className="px-4 py-3">
                          {po.vendor?.username || "—"}
                        </td>

                        <td className="px-4 py-3 font-semibold">
                          {po.product?.name || "—"}
                        </td>

                        <td className="px-4 py-3">
                          {po.product?.id || "—"}
                        </td>

                        <td className="px-4 py-3">
                          {po.product?.sku || "—"}
                        </td>

                        <td className="px-4 py-3 text-right">
                          {qty}
                        </td>

                        <td className="px-4 py-3 text-right font-semibold">
                          ₹ {rate.toLocaleString()}
                        </td>

                        <td className="px-4 py-3 text-right font-bold text-emerald-700">
                          ₹ {total.toLocaleString()}
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2 relative z-10">

                            {status === "DISPATCHED" && (
                              <button
                                onClick={() => handleComplete(po.id)}
                                className="px-3 py-1.5 rounded-md 
                                           bg-emerald-600 hover:bg-emerald-700 
                                           text-white text-xs font-semibold 
                                           cursor-pointer"
                              >
                                Complete
                              </button>
                            )}

                            {status !== "COMPLETED" && (
                              <button
                                onClick={() => navigate(`/po/edit/${po.id}`)}
                                className="px-3 py-1.5 rounded-md 
                                           bg-indigo-600 hover:bg-indigo-700 
                                           text-white text-xs font-semibold"
                              >
                                Edit
                              </button>
                            )}

                            <button
                              onClick={() => handleDelete(po.id)}
                              className="px-3 py-1.5 rounded-md 
                                         bg-red-600 hover:bg-red-700 
                                         text-white text-xs font-semibold"
                            >
                              Delete
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AllPurchaseOrders;
