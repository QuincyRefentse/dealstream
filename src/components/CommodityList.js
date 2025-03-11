import React, { useState, useEffect } from 'react';
import './CommodityList.css';

const CommoditiesList = () => {
  const [commoditiesData, setCommoditiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '7wfmexl3nzz294rze01ja0d8m0yg9s1g0z3bhif6nl1y6ycls40g1e2vya06';
  const TARGET_COMMODITIES = [
    { name: 'Silver', key: 'XAG' },
    { name: 'Gold', key: 'XAU' },
    { name: 'Aluminium', key: 'ALU' },
    { name: 'Coal', key: 'COAL' },
    { name: 'Natural Gas', key: 'NG' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbols = TARGET_COMMODITIES.map(c => c.key).join(',');
        const response = await fetch(
          `https://commodities-api.com/api/latest?access_key=${API_KEY}&base=USD&symbols=${symbols}`
        );

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        if (!data.data.success) throw new Error('Failed to fetch commodity data');
        
        setCommoditiesData(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading commodities data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="commodities-container">
      <div className="header">
        <h2>Commodities Prices</h2>
        <div className="metadata">
          <span>Date: {commoditiesData.date}</span>
          <span>Base Currency: {commoditiesData.base}</span>
        </div>
      </div>

      <div className="commodities-grid">
        {TARGET_COMMODITIES.map((commodity) => (
          <React.Fragment key={commodity.key}>
            
            <div className="commodity-card">
              <h3>{commodity.name}</h3>
              <div className="commodity-info">
                <div className="price">
                  {`$${commoditiesData.rates[`USD${commodity.key}`]?.toFixed(2) || 'N/A'}`}
                </div>
                <div className="unit">
                  {commoditiesData.unit[commodity.key] || 'Unit not available'}
                </div>
              </div>
            </div>

             
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CommoditiesList;