import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSKUById, updateSKU } from "../services/SKUService";
import { getRole } from "../services/LoginService";

const UpdateSKU = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sku, setSku] = useState({
    skuId: "",
    skuDescription: "",
  });

  useEffect(() => {
    getRole().then((r) => setRole(r)).catch(console.error);

    getSKUById(id)
      .then((res) => setSku(res.data || {}))
      .catch(console.error);
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setSku({ ...sku, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  /* ---------- VALIDATION ---------- */
  const validate = () => {
    let temp = {};
    if (!sku.skuDescription.trim())
      temp.skuDescription = "SKU description is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const save = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await updateSKU(sku);
      alert("✅ SKU updated successfully");

      if (role === "ADMIN") navigate("/admin");
      else if (role === "MANAGER") navigate("/manager");
      else navigate("/vendor");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update SKU");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800">
            ✏️ Update SKU
          </h2>
          <p className="text-sm text-slate-500">
            Modify SKU description details
          </p>
        </div>

        <form onSubmit={save} className="space-y-5">

          {/* SKU ID */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              SKU ID
            </label>
            <input
              value={sku.skuId}
              readOnly
              className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-slate-600"
            />
          </div>

          {/* SKU DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              SKU Description
            </label>
            <input
              name="skuDescription"
              value={sku.skuDescription || ""}
              onChange={onChange}
              placeholder="Enter SKU description"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.skuDescription && (
              <p className="text-xs text-red-500 mt-1">
                {errors.skuDescription}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update SKU"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSKU;
