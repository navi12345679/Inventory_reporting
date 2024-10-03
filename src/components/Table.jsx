import React from 'react';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          {/* Assuming these are your column headers */}
          {data.length > 0 && Object.keys(data[0]).map((key, index) => (
            <th key={index} colSpan={2} role="columnheader">{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} role="row">
            {Object.values(row).map((value, colIndex) => (
              <td key={colIndex} role="cell">{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
