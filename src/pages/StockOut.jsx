import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stockOut } from "../services/TransactionService";
import { getAllProducts } from "../services/ProductService";

const StockOut = () => {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const [form, setForm] = useState({
    productId: "",
    quantity: ""
  });

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data || []));
  }, []);

  const onProductChange = (e) => {
    const id = e.target.value;   // 🔥 productId is String like P10001
    setForm({ ...form, productId: id });
    setProduct(products.find((p) => p.id === id));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.productId || !form.quantity) {
      alert("Please select product and enter quantity");
      return;
    }

    if (Number(form.quantity) <= 0) {
      alert("Quantity must be greater than zero");
      return;
    }

    if (Number(form.quantity) > product.currentStock) {
      alert("Not enough stock available");
      return;
    }

    try {
      await stockOut(form.productId, Number(form.quantity), userId);
      alert("Stock Issued Successfully");
      navigate("/transaction");
    } catch (err) {
      console.error(err);
      alert("Stock Issue Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white w-full max-w-2xl p-6 border rounded shadow">

        <h2 className="text-xl font-bold text-center mb-4">
          Stock Issue (Sales)
        </h2>

        {/* Product Dropdown */}
        <select
          className="w-full border p-2 mb-4"
          value={form.productId}
          onChange={onProductChange}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.id} - {p.name}
            </option>
          ))}
        </select>

        {/* Product Info */}
        {product && (
          <div className="border p-4 text-sm mb-4 bg-slate-50 rounded">
            <p><b>Product:</b> {product.name}</p>
            <p><b>SKU:</b> {product.sku}</p>
            <p><b>Current Stock:</b> {product.currentStock}</p>
            <p><b>Cost Price:</b> ₹ {product.currentPrice}</p>
            <p><b>Sale Price:</b> ₹ {product.salePrice}</p>
            <p><b>Profit / Unit:</b> ₹ {product.salePrice - product.currentPrice}</p>
          </div>
        )}

        {/* Quantity */}
        <input
          type="number"
          className="w-full border p-2"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          placeholder="Enter Issued Quantity"
        />

        {/* Total Sale */}
        {product && form.quantity && (
          <p className="mt-2 text-sm text-green-700">
            Total Sale: ₹ {product.salePrice * form.quantity}
          </p>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={submit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Issue Stock
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Return
          </button>
        </div>

      </div>
    </div>
  );
};

export default StockOut;
