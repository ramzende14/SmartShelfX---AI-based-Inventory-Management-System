import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPOById, updatePO } from "../services/PurchaseOrderService";

const EditPurchaseOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= LOAD PURCHASE ORDER ================= */
  useEffect(() => {
    getPOById(id)
      .then((res) => {
        setQuantity(res.data.quantity);
        setStatus(res.data.status);
      })
      .catch(() => alert("Failed to load Purchase Order"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= UPDATE ================= */
  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePO(id, { quantity, status });
      alert("Purchase Order updated successfully");
      navigate("/po");
    } catch {
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading purchase order...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6">

        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800">
            Edit Purchase Order
          </h2>
          <p className="text-sm text-slate-500">
            Update quantity or status for this purchase order
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={submitUpdate} className="space-y-5">

          {/* QUANTITY */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Order Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="DISPATCHED">DISPATCHED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate("/po")}
              className="px-4 py-2 rounded-lg border border-slate-300 
                         bg-white hover:bg-slate-50 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
                         text-white text-sm font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPurchaseOrder;
