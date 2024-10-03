import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './summury.css'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SummaryPage = ({ excelData }) => {
  const [dateFilter, setDateFilter] = useState('');
  const [filteredData, setFilteredData] = useState(excelData);

 
    if (!excelData || excelData.length === 0) {
      return <div>Loading...</div>; 
    }
  
   
  
  // Handle date filter change
  const handleDateChange = (e) => {
    setDateFilter(e.target.value);

    // Filter logic based on date
    const filtered = excelData.filter(data => new Date(data.OrderDate) >= new Date(e.target.value));
    setFilteredData(filtered);
    console.log(filtered);
  };

  // Example dataset for charts
  // Assuming filteredData is defined and populated earlier
console.log(filteredData); // Debugging line

const totalShipped = filteredData.reduce((sum, item) => {
  const quantity = parseFloat(item.OrderItemQuantity) || 0; // Convert to number, default to 0 if invalid
  return sum + (item.Status.toLowerCase() === 'shipped' ? quantity : 0);
}, 0);

const totalReceived = filteredData.reduce((sum, item) => {
  const quantity = parseFloat(item.OrderItemQuantity) || 0; // Convert to number, default to 0 if invalid
  return sum + (item.Status.toLowerCase() === 'received' ? quantity : 0);
}, 0);

console.log(`Total Shipped: ${totalShipped}`);
console.log(`Total Received: ${totalReceived}`);

  const graphData1 = {
    labels: ['Shipped', 'Received'],
    datasets: [{
      label: 'Orders',
      data: [totalShipped, totalReceived],
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }]
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary');
    XLSX.writeFile(workbook, 'SummaryReport.xlsx');
  };

  const exportToPDF = () => {
    const input = document.getElementById('report');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('SummaryReport.pdf');
    });
  };

  return (
    <div className='mainsummary'>
      <h1>Report Summary</h1>
      <div>
        <label>Date Filter:</label>
        <input type="date" value={dateFilter} onChange={handleDateChange} />
      </div>
      
      {/* Display important data points */}
      <div id="report">
        <h3>Total Shipped: {totalShipped}</h3>
        <h3>Total Received: {totalReceived}</h3>

        {/* Graph: Shipped vs Received */}
        <Bar data={graphData1} options={{ responsive: true, plugins: { title: { display: true, text: 'Shipped vs Received' } } }} />
        
        {/* Additional graphs and tables can be added here */}
      </div>

      {/* Export buttons */}
      <button onClick={exportToExcel}>Export to Excel</button>
      <button onClick={exportToPDF}>Export to PDF</button>
    </div>
  );
};

export default SummaryPage;
