import React from 'react';
import * as XLSX from 'xlsx';


const ExportToExcel = ({ data }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'report.xlsx');
  };

  return (
    <button onClick={exportToExcel}>
      Export to Excel
    </button>
  );
};

export default ExportToExcel;
