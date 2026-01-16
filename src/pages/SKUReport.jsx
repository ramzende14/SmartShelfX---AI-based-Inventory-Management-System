import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllSKUs, deleteSKUById } from "../services/SKUService";
import { getRole } from "../services/LoginService";

const SKUReport = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [skuList, setSkuList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRole()
      .then((r) => setRole(r))
      .catch(console.error);

    getAllSKUs()
      .then((res) => setSkuList(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const deleteSKU = async (id) => {
    if (!window.confirm("Are you sure you want to delete this SKU?")) return;

    try {
      await deleteSKUById(id);
      setSkuList((prev) => prev.filter((s) => s.skuId !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete SKU.");
    }
  };

  const returnBack = () => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "MANAGER") navigate("/manager");
    else navigate("/vendor");
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">
              SKU Management
            </h2>
            <p className="text-sm text-slate-500">
              View, update, and manage product SKUs
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={returnBack}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
            >
              ← Back
            </button>

            {(role === "ADMIN" || role === "MANAGER") && (
              <Link
                to="/sku/new"
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                + Add SKU
              </Link>
            )}
          </div>
        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  
                  <th className="px-4 py-3 text-left">SKU ID</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-slate-400">
                      Loading SKUs...
                    </td>
                  </tr>
                ) : skuList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-slate-400">
                      No SKU records found.
                    </td>
                  </tr>
                ) : (
                  skuList.map((sku, ) => (
                    <tr
                      key={sku.skuId}
                      className="hover:bg-slate-50 transition"
                    >
                      
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        {sku.skuId}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {sku.skuDescription}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          {(role === "ADMIN" || role === "MANAGER") && (
                            <Link
                              to={`/update-sku/${sku.skuId}`}
                              className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                            >
                              Edit
                            </Link>
                          )}

                          {(role === "ADMIN" || role === "MANAGER") && (
                            <button
                              onClick={() => deleteSKU(sku.skuId)}
                              className="px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-semibold"
                            >
                              Delete
                            </button>
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

export default SKUReport;
