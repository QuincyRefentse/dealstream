import React, { useState, useEffect } from "react";
import './BuySellForm.css'; // Import the CSS for styling

const BuySellForm = () => {
  const [commoditiesData, setCommoditiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commodity, setCommodity] = useState("");  // Selected commodity
  const [quantity, setQuantity] = useState("");    // Quantity in KG
  const [price, setPrice] = useState("");          // Price per unit
  const [action, setAction] = useState("buy");     // "buy" or "sell"
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send this data to the API to process the transaction
    console.log(`Action: ${action}, Commodity: ${commodity}, Quantity: ${quantity}, Price: ${price}`);
  };

  // Get price for the selected commodity
  const selectedCommodity = TARGET_COMMODITIES.find((c) => c.key === commodity);
  const selectedPrice = selectedCommodity ? commoditiesData.rates[commodity] : null;

  return (
    <div className="buy-sell-form-container">
      <h2>{action === "buy" ? "Buy" : "Sell"} Commodities</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Choose Commodity:
          <select value={commodity} onChange={(e) => setCommodity(e.target.value)}>
            <option value="">Select a commodity</option>
            {TARGET_COMMODITIES.map((commodity) => (
              <option key={commodity.key} value={commodity.key}>
                {commodity.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        {commodity && selectedPrice && (
          <div className="price-info">
            <p>Price per unit: ${selectedPrice.toFixed(2)}</p>
          </div>
        )}
        <label>
          Quantity in KILOGRAMS (KG):
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </label>
        <br />
        <label>
          Price per unit (USD):
          <input
            type="number"
            value={price || selectedPrice || ''}
            onChange={(e) => setPrice(e.target.value)}
            min="0.01"
            step="0.01"
            required
            disabled={!!selectedPrice}  // Disable price input if price is already fetched
          />
        </label>
        <br />
        <button type="submit">{action === "buy" ? "Buy" : "Sell"}</button>
      </form>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setAction(action === "buy" ? "sell" : "buy")}>
          Switch to {action === "buy" ? "Sell" : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default BuySellForm;
