import React from 'react';
import './backorder.css'

const BackorderReport = ({ excelData }) => {
  const backorderData = excelData.filter(item => item.OrderItemQuantity > item.AvaliableQuantity);

  return (
    <div className='backorder'>
      <h2>Backorder Report</h2>
      {backorderData.length > 0 ? (
        <ul className='bckorderlist'>
          {backorderData.map((order, index) => (
            <li key={index}>
              {order.ProductName}: Backorder Quantity - {order.OrderItemQuantity - order.AvaliableQuantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No backorders.</p>
      )}
    </div>
  );
};

export default BackorderReport;
