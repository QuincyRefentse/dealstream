import React, { useState, useEffect } from 'react';
import './BuySellForm.css'; // Import the CSS for styling

const BuySellForm = ({ balance, setBalance, updateAssets, assets }) => {
  const [commoditiesData, setCommoditiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commodity, setCommodity] = useState("");  // Selected commodity
  const [quantity, setQuantity] = useState("");    // Quantity in KG
  const [price, setPrice] = useState("");          // Price per unit
  const [action, setAction] = useState("buy");     // "buy" or "sell"
  const [customQuantity, setCustomQuantity] = useState(""); // Store the custom quantity if entered

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
    const totalCost = price * quantity;

    if (action === "buy") {
      if (totalCost <= balance) {
        // Update balance and assets
        setBalance(balance - totalCost);
        updateAssets(commodity, action, quantity, price); // Update assets
        alert(`You bought ${quantity} units of ${commodity}`);
      } else {
        alert("Insufficient balance for the transaction.");
      }
    } else if (action === "sell") {
      // You can add further checks to ensure the user has enough of the asset to sell
      const assetToSell = assets.find((asset) => asset.key === commodity);
      if (assetToSell && assetToSell.quantity >= quantity) {
        updateAssets(commodity, action, quantity, price); // Update assets
        const totalSaleValue = price * quantity;
        setBalance(balance + totalSaleValue);
        alert(`You sold ${quantity} units of ${commodity}`);
      } else {
        alert("You don't have enough of this asset to sell.");
      }
    }
  };

  const selectedCommodity = TARGET_COMMODITIES.find((c) => c.key === commodity);
  const selectedPrice = selectedCommodity ? commoditiesData.rates[commodity] : null;

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Ensure that the quantity is a positive number
    if (value === '' || /^[0-9]*\.?[0-9]+$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleCustomQuantityChange = (e) => {
    const value = e.target.value;
    // Ensure that the custom quantity is a positive number
    if (value === '' || /^[0-9]*\.?[0-9]+$/.test(value)) {
      setCustomQuantity(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Ensure that the price is a positive number
    if (value === '' || /^[0-9]*\.?[0-9]+$/.test(value)) {
      setPrice(value);
    }
  };

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
          Quantity in GRAMS:
          <select value={quantity} onChange={handleQuantityChange}>
            <option value="">Select Quantity</option>
            <option value="100">100 grams</option>
            <option value="250">250 grams</option>
            <option value="500">500 grams</option>
            <option value="1000">1 kilogram (1000 grams)</option>
            <option value="2000">2 kilograms (2000 grams)</option>
            <option value="5000">5 kilograms (5000 grams)</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        <br />
        {quantity === "custom" && (
          <label>
            Enter Custom Quantity (grams):
            <input
              type="number"
              value={customQuantity}
              onChange={handleCustomQuantityChange}
              min="1"
              required
            />
          </label>
        )}
        <br />
        <label>
          Price per unit (USD):
          <input
            type="number"
            value={price || selectedPrice || ''}
            onChange={handlePriceChange} // Use custom handler for price
            min="0.01"  // Allow decimal values greater than 0
            step="0.01"  // Allow decimal step
            required
            disabled={!!selectedPrice}  // Disable price input if price is already fetched
          />
        </label>
        <br />
        <button
          type="submit"
          className={action === "buy" ? "buy-btn" : "sell-btn"} // Conditionally apply the class based on the action
        >
          {action === "buy" ? "Buy" : "Sell"}
        </button>
      </form>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setAction(action === "buy" ? "sell" : "buy")} className="switch-action-btn">
          Switch to {action === "buy" ? "Sell" : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default BuySellForm;
