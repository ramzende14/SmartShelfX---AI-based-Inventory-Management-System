import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductWiseTotalSale } from "../services/TransactionService";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductPieAnalysis = () => {
  const navigate = useNavigate();
  const [productSale, setProductSale] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadData();
  }, []);

  const loadData = () => {
    getProductWiseTotalSale()
      .then((res) => setProductSale(res.data))
      .catch(() => alert("Failed to load sales data"))
      .finally(() => setLoading(false));
  };

  const filteredData = productSale.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = {
    labels: filteredData.map((p) => p.productName),
    datasets: [
      {
        data: filteredData.map((p) => p.totalSaleValue),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const exportCSV = () => {
    let csv = "Product,Total Sale,Quantity\n";
    productSale.forEach((p) => {
      csv += `${p.productName},${p.totalSaleValue},${p.totalQuantity}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "product_sales.csv";
    link.click();
  };

  if (loading) {
    return (
      <div className="text-center p-10 text-lg font-semibold">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">
        📊 Product Sales Dashboard
      </h3>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search product..."
        className="border p-2 mb-4 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT SIDE - TABLE */}
        <div className="lg:w-1/2 w-full overflow-x-auto">
          <table className="w-full border rounded shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2">Total Sale ₹</th>
                <th className="border p-2">Qty Sold</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredData.map((p, i) => (
                  <tr key={i} className="text-center hover:bg-gray-50">
                    <td className="border p-2">{p.productName}</td>
                    <td className="border p-2 font-semibold text-green-600">
                      ₹{p.totalSaleValue.toFixed(2)}
                    </td>
                    <td className="border p-2">{p.totalQuantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* RIGHT SIDE - CHART */}
        <div className="lg:w-1/2 w-full flex justify-center items-center">
          {filteredData.length > 0 ? (
            <div className="w-[300px] md:w-[350px]">
              <Pie data={chartData} />
            </div>
          ) : (
            <p className="text-gray-500">No chart data available</p>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate("/AdminMenu")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ⬅ Back
        </button>

        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ⬇ Export CSV
        </button>
      </div>
    </div>
  );
};

export default ProductPieAnalysis;
