import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllProducts } from "../services/ProductService";
import { createPO } from "../services/PurchaseOrderService";

const CreatePurchaseOrder = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [productId, setProductId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data || []))
      .catch(console.error);

    // 🔥 SAME vendor loading style as ProductEntry
    axios
      .get("http://localhost:8080/invent/vendors")
      .then((res) => setVendors(res.data || []))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !vendorId || !quantity) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createPO(
  productId,                
  Number(vendorId),
  Number(quantity)
);


      alert("Purchase Order created successfully");
      navigate("/po");

    } catch (err) {
      console.error(err);
      alert("Failed to create Purchase Order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          📦 Create Purchase Order (Stock In)
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* PRODUCT */}
          <div>
            <label className="text-sm font-medium">Product</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id} — {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* VENDOR */}
          <div>
            <label className="text-sm font-medium">Vendor</label>
            <select
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Vendor</option>
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.id} — {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* QTY */}
          <div>
            <label className="text-sm font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Purchase Order"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;
