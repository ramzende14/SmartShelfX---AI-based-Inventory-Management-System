import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductWiseTotalSale } from "../Services/TransactionService";
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadData();
  }, []);

  const loadData = () => {
    getProductWiseTotalSale()
      .then((res) => setProductSale(res.data))
      .catch(() => alert("Failed to load sales data"));
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
      },
    ],
  };

  const exportCSV = () => {
    let csv = "Product,Total Sale,Quantity\n";
    productSale.forEach(p => {
      csv += `${p.productName},${p.totalSaleValue},${p.totalQuantity}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "product_sales.csv";
    link.click();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">📊 Product Sales Dashboard</h3>

      <input
        type="text"
        placeholder="Search product..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border mb-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Total Sale ₹</th>
            <th className="border p-2">Qty Sold</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((p, i) => (
            <tr key={i} className="text-center">
              <td className="border p-2">{p.productName}</td>
              <td className="border p-2">₹{p.totalSaleValue.toFixed(2)}</td>
              <td className="border p-2">{p.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ width: "350px", margin: "auto" }}>
        <Pie data={chartData} />
      </div>

      <div className="mt-4 flex justify-between">
        <button onClick={() => navigate("/AdminMenu")} className="btn btn-success">
          ⬅ Back
        </button>
        <button onClick={exportCSV} className="btn btn-primary">
          ⬇ Export CSV
        </button>
      </div>
    </div>
  );
};

export default ProductPieAnalysis;
