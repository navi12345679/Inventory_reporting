import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Inventory.css'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryAgingReport = ({ excelData }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const today = new Date();

  // Categorize aging data
  const getAgingCategory = (orderDate) => {
    const orderDateParsed = new Date(orderDate);
    const diffDays = Math.floor((today - orderDateParsed) / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) return '0-30 Days';
    if (diffDays <= 60) return '31-60 Days';
    if (diffDays <= 90) return '61-90 Days';
    if (diffDays <= 120) return '91-120 Days';
    return '120+ Days';
  };

  // Filter by category if selected
  const filteredData = selectedCategory
    ? excelData.filter(item => item.CategoryName === selectedCategory)
    : excelData;

  const agingData = filteredData.reduce((acc, item) => {
    const agingCategory = getAgingCategory(item.OrderDate);
    acc[agingCategory] = (acc[agingCategory] || 0) + item.AvaliableQuantity;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(agingData),
    datasets: [{
      label: 'Stock Quantity',
      data: Object.values(agingData),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div className='inventory'>
      <h2>Inventory Aging Report</h2>
      <div>
        <label>Select Category: </label>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">All Categories</option>
          {/* Populate categories dynamically */}
          {[...new Set(excelData.map(item => item.CategoryName))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <Bar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Inventory Aging' } } }} />
    </div>
  );
};

export default InventoryAgingReport;
