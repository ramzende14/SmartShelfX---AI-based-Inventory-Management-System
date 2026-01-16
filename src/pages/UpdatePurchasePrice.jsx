import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct
} from "../services/ProductService";

const PROFIT_PERCENT = 30;

const UpdatePurchasePrice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          type: "error",
          text: "❌ Failed to load product",
        });
        setLoading(false);
      });
  }, [id]);

  const onPriceChange = (e) => {
    const price = Number(e.target.value);

    if (price < 0) return;

    const salePrice = Math.round(
      price + (price * PROFIT_PERCENT) / 100
    );

    setProduct({
      ...product,
      currentPrice: price,   
      salePrice: salePrice,
    });

    setError("");
    setMessage({ type: "", text: "" });
  };

  
  const save = async () => {
    if (!product.currentPrice && product.currentPrice !== 0) {
      setError("Purchase price is required");
      return;
    }

    try {
      setSaving(true);
      await updateProduct(product);

      setMessage({
        type: "success",
        text: "✅ Purchase price updated successfully",
      });
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Update failed",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-extrabold text-slate-800">
          💰 Update Purchase Price
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Product ID: <span className="font-medium">{product.id}</span>
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

        <div className="mb-3">
          <label className="text-sm font-medium">Product Name</label>
          <input
            value={product.name}
            disabled
            className="mt-1 w-full border rounded px-3 py-2 bg-slate-100"
          />
        </div>

        <div className="mb-3">
          <label className="text-sm font-medium">
            Purchase Price
          </label>
          <input
            type="number"
            value={product.currentPrice}
            onChange={onPriceChange}
            className="mt-1 w-full border rounded px-3 py-2"
          />
          {error && (
            <p className="text-xs text-red-500 mt-1">
              {error}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium">
            Sale Price (Auto – 30%)
          </label>
          <input
            value={product.salePrice}
            disabled
            className="mt-1 w-full border rounded px-3 py-2 bg-slate-100"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-lg"
          >
            ← Back
          </button>

          <button
            onClick={save}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            {saving ? "Saving..." : "Update"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UpdatePurchasePrice;
