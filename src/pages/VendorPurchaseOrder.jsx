import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getVendorPOs,
  approvePO,
  rejectPO,
  dispatchPO,
} from "../services/PurchaseOrderService";

const VendorPurchaseOrders = () => {
  const navigate = useNavigate();
  const vendorId = localStorage.getItem("userId");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPOs = async () => {
    try {
      const res = await getVendorPOs(vendorId);
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPOs();
  }, []);

  /* ================= STATUS BADGE ================= */
  const statusBadge = (status) => {
    switch (status) {
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">
              My Purchase Orders
            </h2>
            <p className="text-sm text-slate-500">
              Review, approve, reject, and dispatch purchase orders
            </p>
          </div>

          <button
            onClick={() => navigate("/vendor")}
            className="px-4 py-2 text-sm rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
          >
            ← Back
          </button>
        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left">PO ID</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-400">
                      Loading purchase orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-400">
                      No purchase orders assigned to you.
                    </td>
                  </tr>
                ) : (
                  orders.map((po) => (
                    <tr key={po.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-medium">{po.id}</td>

                      <td className="px-4 py-3 font-semibold text-slate-800">
                        {po.product?.name || "—"}
                      </td>

                      <td className="px-4 py-3">{po.quantity}</td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge(
                            po.status
                          )}`}
                        >
                          {po.status}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">

                          {po.status === "PENDING" && (
                            <>
                              <button
                                onClick={() =>
                                  approvePO(po.id).then(loadPOs)
                                }
                                className="px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white text-xs font-semibold"
                              >
                                Approve
                              </button>

                              <button
                                onClick={() =>
                                  rejectPO(po.id, "Out of stock").then(loadPOs)
                                }
                                className="px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-semibold"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {po.status === "APPROVED" && (
                            <button
                              onClick={() =>
                                dispatchPO(po.id).then(loadPOs)
                              }
                              className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                            >
                              Dispatch
                            </button>
                          )}

                          {po.status === "DISPATCHED" && (
                            <span className="text-xs text-slate-400 font-medium">
                              Awaiting confirmation
                            </span>
                          )}

                          {po.status === "COMPLETED" && (
                            <span className="text-xs text-green-600 font-semibold">
                              Completed
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPurchaseOrders;
