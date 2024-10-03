import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SummaryPage from './components/Summurypage/SummaryPage';
import InventoryAgingReport from './components/Inventoryaging/InventoryAgingReport';
import BackorderReport from './components/Backorder/BackorderReport';
import './App.css';

function App() {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    console.log(excelData);
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setExcelData(data))
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul className='navlist' style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '20px' }}>
            <li>
              <Link to="/summary">Summary</Link>
            </li>
            <li>
              <Link to="/inventory-aging">Inventory Aging Report</Link>
            </li>
            <li>
              <Link to="/backorder">Backorder Report</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<SummaryPage excelData={excelData} />} />
          <Route path="/summary" element={<SummaryPage excelData={excelData}  />} />
          <Route path="/inventory-aging" element={<InventoryAgingReport  excelData={excelData}/>} />
          <Route path="/backorder" element={<BackorderReport excelData={excelData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
