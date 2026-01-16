import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveSKU } from "../services/SKUService";
import { getRole } from "../services/LoginService";

const SKUEntry = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [skuData, setSkuData] = useState({
    skuId: "",
    skuDescription: "",
  });

  useEffect(() => {
    getRole()
      .then((r) => setRole(r))
      .catch(console.error);
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSkuData({ ...skuData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  /* ---------- VALIDATION ---------- */
  const validate = () => {
    let temp = {};
    if (!skuData.skuId.trim()) temp.skuId = "SKU ID is required";
    if (!skuData.skuDescription.trim())
      temp.skuDescription = "SKU description is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const createNewSku = async () => {
    try {
      setLoading(true);
      const res = await saveSKU(skuData);

      if (res.status === 200 || res.status === 201) {
        alert("✅ New SKU added successfully");

        if (role === "ADMIN") navigate("/admin");
        else if (role === "MANAGER") navigate("/manager");
        else navigate("/vendor");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save SKU.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await createNewSku();
  };

  const returnBack = () => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "MANAGER") navigate("/manager");
    else navigate("/vendor");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800">
            🏷️ Create New SKU
          </h2>
          <p className="text-sm text-slate-500">
            Add a new stock keeping unit to the system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* SKU ID */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              SKU ID
            </label>
            <input
              name="skuId"
              value={skuData.skuId}
              onChange={onChangeHandler}
              placeholder="e.g. SKU-1001"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.skuId && (
              <p className="text-xs text-red-500 mt-1">{errors.skuId}</p>
            )}
          </div>

          {/* SKU DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              SKU Description
            </label>
            <input
              name="skuDescription"
              value={skuData.skuDescription}
              onChange={onChangeHandler}
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
              onClick={returnBack}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save SKU"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SKUEntry;
