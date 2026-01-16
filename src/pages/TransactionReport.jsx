import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../services/TransactionService";
import { getAllProducts } from "../services/ProductService";
import { getRole } from "../services/LoginService";

const TransactionReport = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [productMap, setProductMap] = useState({});
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await getRole();
        setRole(r);

        const txRes = await getTransactions();
        const stockOut = (txRes.data || []).filter(t => t.type === "OUT");
        setTransactions(stockOut);

        const prodRes = await getAllProducts();
        const map = {};
        (prodRes.data || []).forEach(p => {
          map[String(p.id)] = p;
        });
        setProductMap(map);

      } catch (e) {
        console.error("API ERROR", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const goBack = () => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "MANAGER") navigate("/manager");
    else navigate("/vendor");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow rounded">

        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">📦 Stock Issue Report</h2>
            <p className="text-sm text-gray-500">Stock OUT Transactions</p>
          </div>
          <button
            onClick={goBack}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            ← Back
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">IO No</th>
              <th className="p-3">Product ID</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Rate</th>
              <th className="p-3">Total</th>
              <th className="p-3">Handled By</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center p-10">
                  Loading...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-10 text-gray-500">
                  No Stock OUT records
                </td>
              </tr>
            ) : (
              transactions.map(t => (
                <tr key={t.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-mono text-blue-600">
                    {t.transactionCode || "IO-NA"}
                  </td>

                  <td className="p-3">{t.productId}</td>

                  <td className="p-3 font-semibold">
                    {productMap[String(t.productId)]?.name || "Unknown"}
                  </td>

                  <td className="p-3">{t.quantity}</td>

                  <td className="p-3">₹ {t.rate}</td>

                  <td className="p-3 font-bold text-green-600">
                    ₹ {t.transactionValue}
                  </td>

                  <td className="p-3">
                    User-{t.handledBy}
                  </td>

                  <td className="p-3">
                    {new Date(t.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default TransactionReport;
