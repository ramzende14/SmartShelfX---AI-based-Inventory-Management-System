import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/ProductService";
import { getAllSKUs } from "../services/SKUService";
import { getRole } from "../services/LoginService";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [skus, setSkus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 🔥 PRICE FIELDS ADDED
  const [product, setProduct] = useState({
    id: "",
    name: "",
    sku: "",
    vendorId: "",
    reorderLevel: "",
    currentStock: "",
    category: "",
    currentPrice: "",
    salePrice: "",
  });

  useEffect(() => {
    // 🔥 ROLE FIX
    getRole()
      .then((res) => setRole(res.data.role))
      .catch(console.error);

    getProductById(id)
      .then((res) => setProduct(res.data || {}))
      .catch(console.error);

    getAllSKUs()
      .then((res) => setSkus(res.data || []))
      .catch(console.error);
  }, [id]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  /* ---------- VALIDATION ---------- */
  const validate = () => {
    let temp = {};

    if (!product.name?.trim()) temp.name = "Product name is required";
    if (!product.sku) temp.sku = "SKU is required";
    if (!product.vendorId) temp.vendorId = "Vendor ID required";
    if (product.reorderLevel === "") temp.reorderLevel = "Reorder level required";
    if (product.currentStock === "") temp.currentStock = "Current stock required";
    if (!product.category?.trim()) temp.category = "Category required";
    if (product.currentPrice === "") temp.currentPrice = "Current price required";
    if (product.salePrice === "") temp.salePrice = "Sale price required";

    // optional safety check
    if (
      product.currentPrice !== "" &&
      product.salePrice !== "" &&
      Number(product.salePrice) > Number(product.currentPrice)
    ) {
      temp.salePrice = "Sale price cannot be greater than current price";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const saveUpdatedProduct = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // 🔥 BACKEND MATCH PAYLOAD
    const payload = {
      ...product,
      vendorId: Number(product.vendorId),
      reorderLevel: Number(product.reorderLevel),
      currentStock: Number(product.currentStock),
      currentPrice: Number(product.currentPrice),
      salePrice: Number(product.salePrice),
    };

    try {
      setLoading(true);
      await updateProduct(payload);
      alert("✅ Product updated successfully!");

      if (role === "ADMIN") navigate("/admin");
      else if (role === "MANAGER") navigate("/manager");
      else navigate("/vendor");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800">
            ✏️ Update Product
          </h2>
          <p className="text-sm text-slate-500">
            Modify product details, stock, and pricing
          </p>
        </div>

        <form onSubmit={saveUpdatedProduct} className="space-y-5">

          {/* PRODUCT ID */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Product ID
            </label>
            <input
              value={product.id}
              readOnly
              className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-slate-600"
            />
          </div>

          {/* PRODUCT NAME */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Product Name
            </label>
            <input
              name="name"
              value={product.name || ""}
              onChange={onChangeHandler}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-slate-700">SKU</label>
            <select
              name="sku"
              value={product.sku || ""}
              onChange={onChangeHandler}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
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

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Vendor ID
              </label>
              <input
                name="vendorId"
                value={product.vendorId}
                onChange={onChangeHandler}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
              {errors.vendorId && <p className="text-xs text-red-500">{errors.vendorId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Category
              </label>
              <input
                name="category"
                value={product.category || ""}
                onChange={onChangeHandler}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>
          </div>

          {/* STOCK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Reorder Level
              </label>
              <input
                type="number"
                name="reorderLevel"
                value={product.reorderLevel}
                onChange={onChangeHandler}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
              {errors.reorderLevel && <p className="text-xs text-red-500">{errors.reorderLevel}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Current Stock
              </label>
              <input
                type="number"
                name="currentStock"
                value={product.currentStock}
                onChange={onChangeHandler}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
              {errors.currentStock && <p className="text-xs text-red-500">{errors.currentStock}</p>}
            </div>
          </div>

          {/* 🔥 PRICE SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Current Price
              </label>
              <input
                type="number"
                name="currentPrice"
                value={product.currentPrice}
                onChange={onChangeHandler}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
              {errors.currentPrice && (
                <p className="text-xs text-red-500">{errors.currentPrice}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Sale Price
              </label>
              <input
                type="number"
                name="salePrice"
                value={product.salePrice}
                onChange={onChangeHandler}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
              {errors.salePrice && (
                <p className="text-xs text-red-500">{errors.salePrice}</p>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border bg-white"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
