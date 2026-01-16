import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  saveProduct,
  getNextProductId
} from "../services/ProductService";
import { getAllSKUs } from "../services/SKUService";
import { getRole } from "../services/LoginService";

const PROFIT_PERCENT = 30;

const ProductEntry = () => {
  const navigate = useNavigate();

  const [, setRole] = useState("");
  const [skus, setSkus] = useState([]);
  const [vendors, setVendors] = useState([]); // 🔥 vendors list
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  const emptyProduct = {
    id: "",
    name: "",
    sku: "",
    vendorId: "",
    reorderLevel: "",
    currentStock: "",
    category: "",
    currentPrice: "",
    salePrice: 0,
  };

  const [product, setProduct] = useState(emptyProduct);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    getRole()
      .then((r) => setRole(r.data?.role || r))
      .catch(console.error);

    getAllSKUs()
      .then((res) => setSkus(res.data || []))
      .catch(console.error);

    // 🔥 LOAD VENDORS
    axios
      .get("http://localhost:8080/invent/vendors")
      .then((res) => setVendors(res.data || []))
      .catch(console.error);

    fetchProductId();
  }, []);

  const fetchProductId = async () => {
    try {
      const res = await getNextProductId();
      setProduct((prev) => ({ ...prev, id: res.data.productId }));
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CHANGE HANDLER ================= */
  const onChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...product, [name]: value };

    if (name === "currentPrice" && value !== "") {
      const price = Number(value);
      updated.salePrice = Math.round(
        price + (price * PROFIT_PERCENT) / 100
      );
    }

    setProduct(updated);
    setErrors({ ...errors, [name]: "" });
    setMessage({ type: "", text: "" });
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    let temp = {};

    if (!product.name.trim()) temp.name = "Product name is required";
    if (!product.sku) temp.sku = "SKU is required";
    if (!product.vendorId) temp.vendorId = "Vendor is required";
    if (product.reorderLevel === "") temp.reorderLevel = "Reorder level required";
    if (product.currentStock === "") temp.currentStock = "Current stock required";
    if (!product.category.trim()) temp.category = "Category required";
    if (product.currentPrice === "") temp.currentPrice = "Purchase price required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  /* ================= SAVE ================= */
  const save = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...product,
      vendorId: Number(product.vendorId),   // 🔥 ONLY ID SENT
      reorderLevel: Number(product.reorderLevel),
      currentStock: Number(product.currentStock),
      currentPrice: Number(product.currentPrice),
      salePrice: Number(product.salePrice),
    };

    try {
      setLoading(true);
      await saveProduct(payload);
      setMessage({
        type: "success",
        text: "Product saved successfully",
      });
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Failed to save product",
      });
    } finally {
      setLoading(false);
    }
  };

  const newEntry = async () => {
    setProduct(emptyProduct);
    setErrors({});
    setMessage({ type: "", text: "" });
    await fetchProductId();
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl border shadow-sm p-8">

        <h2 className="text-2xl font-extrabold text-slate-800 mb-1">
          ➕ Product Entry
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Sale price auto-calculated (30% profit)
        </p>

        {message.text && (
          <div
            className={`mb-4 rounded-lg px-4 py-2 text-sm font-medium
            ${message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={save} className="space-y-4">

          {/* PRODUCT ID */}
          <div>
            <label className="text-sm font-medium">Product ID</label>
            <input
              value={product.id}
              disabled
              className="mt-1 w-full rounded-lg border px-3 py-2 bg-slate-100"
            />
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <input
              name="name"
              value={product.name}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* SKU */}
          <div>
            <label className="text-sm font-medium">SKU</label>
            <select
              name="sku"
              value={product.sku}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            >
              <option value="">Select SKU</option>
              {skus.map((s) => (
                <option key={s.skuId} value={s.skuId}>
                  {s.skuId} — {s.skuDescription}
                </option>
              ))}
            </select>
            {errors.sku && <p className="text-xs text-red-500">{errors.sku}</p>}
          </div>

          {/* 🔥 VENDOR DROPDOWN */}
          <div>
            <label className="text-sm font-medium">Vendor</label>
            <select
              name="vendorId"
              value={product.vendorId}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            >
              <option value="">Select Vendor</option>
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.id} — {v.name}
                </option>
              ))}
            </select>
            {errors.vendorId && (
              <p className="text-xs text-red-500">{errors.vendorId}</p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              name="category"
              value={product.category}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category}</p>
            )}
          </div>

          {/* STOCK */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="reorderLevel"
              type="number"
              placeholder="Reorder Level"
              value={product.reorderLevel}
              onChange={onChange}
              className="border rounded px-3 py-2"
            />
            <input
              name="currentStock"
              type="number"
              placeholder="Current Stock"
              value={product.currentStock}
              onChange={onChange}
              className="border rounded px-3 py-2"
            />
          </div>

          {/* PRICE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Purchase Price</label>
              <input
                name="currentPrice"
                type="number"
                value={product.currentPrice}
                onChange={onChange}
                className="mt-1 w-full border rounded px-3 py-2"
              />
              {errors.currentPrice && (
                <p className="text-xs text-red-500">{errors.currentPrice}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Sale Price (Auto)</label>
              <input
                value={product.salePrice}
                disabled
                className="mt-1 w-full border rounded px-3 py-2 bg-slate-100"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-lg"
            >
              ← Back
            </button>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                onClick={newEntry}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
              >
                New Entry
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProductEntry;
