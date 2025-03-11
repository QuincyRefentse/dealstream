import React, { useState, useEffect } from 'react';
import './BuySellForm.css';

const BuySellForm = ({ balance, updateAssets, assets }) => {
  const [commoditiesData, setCommoditiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commodity, setCommodity] = useState("");
  const [quantity, setQuantity] = useState("custom");
  const [customQuantity, setCustomQuantity] = useState("");

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
    const finalQuantity = parseFloat(customQuantity);
    const selectedPrice = commoditiesData.rates[`USD${commodity}`];
    const totalCost = selectedPrice * finalQuantity;

    if (totalCost <= balance) {
      updateAssets(commodity, "buy", finalQuantity, selectedPrice);
      alert(`Bought ${finalQuantity}g of ${commodity}`);
    } else {
      alert("Insufficient balance to buy");
    }
  };

  return (
    <div className="buy-sell-form-container">
      <h2>Buy Commodities</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Commodity:
          <select value={commodity} onChange={(e) => setCommodity(e.target.value)} required>
            <option value="">Select</option>
            {TARGET_COMMODITIES.map((c) => (
              <option key={c.key} value={c.key}>{c.name}</option>
            ))}
          </select>
        </label>

        {commodity && (
          <div className="price-info">
            <p>Current Price: ${commoditiesData.rates[`USD${commodity}`]?.toFixed(4)}/g</p>
          </div>
        )}

        <label>
          Custom Quantity (grams):
          <input
            type="number"
            value={customQuantity}
            onChange={(e) => setCustomQuantity(e.target.value)}
            min="0"         // Ensures no negative values
            step="0.01"     // Allows decimal values up to two decimal places
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="action-btn buy-btn">
            Buy
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuySellForm;


{/*
import React, { useState, useEffect } from 'react';
import './BuySellForm.css';

const BuySellForm = ({ balance, updateAssets, assets }) => {
  const [commoditiesData, setCommoditiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commodity, setCommodity] = useState("");
  const [quantity, setQuantity] = useState("custom");
  const [customQuantity, setCustomQuantity] = useState("");

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
    const finalQuantity = parseFloat(customQuantity);
    const selectedPrice = commoditiesData.rates[`USD${commodity}`];
    const totalCost = selectedPrice * finalQuantity;

    if (totalCost <= balance) {
      updateAssets(commodity, "buy", finalQuantity, selectedPrice);
      alert(`Bought ${finalQuantity}g of ${commodity}`);
    } else {
      alert("Insufficient balance to buy");
    }
  };

  return (
    <div className="buy-sell-form-container">
      <h2>Buy Commodities</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Commodity:
          <select value={commodity} onChange={(e) => setCommodity(e.target.value)} required>
            <option value="">Select</option>
            {TARGET_COMMODITIES.map((c) => (
              <option key={c.key} value={c.key}>{c.name}</option>
            ))}
          </select>
        </label>

        {commodity && (
          <div className="price-info">
            <p>Current Price: ${commoditiesData.rates[`USD${commodity}`]?.toFixed(4)}/g</p>
          </div>
        )}

        <label>
          Custom Quantity (grams):
          <input
            type="number"
            value={customQuantity}
            onChange={(e) => setCustomQuantity(e.target.value)}
            min="1"
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="action-btn buy-btn">
            Buy
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuySellForm;

{/*
import React, { useState, useEffect } from 'react';
import './BuySellForm.css';

const BuySellForm = ({ balance, updateAssets, assets }) => {
  const [commoditiesData, setCommoditiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commodity, setCommodity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [action, setAction] = useState("buy");
  const [customQuantity, setCustomQuantity] = useState("");

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
    const finalQuantity = quantity === "custom" ? parseFloat(customQuantity) : parseFloat(quantity);
    const selectedPrice = commoditiesData.rates[`USD${commodity}`];
    const totalCost = selectedPrice * finalQuantity;

    if (action === "buy") {
      if (totalCost <= balance) {
        updateAssets(commodity, action, finalQuantity, selectedPrice);
        alert(`Bought ${finalQuantity}g of ${commodity}`);
      } else {
        alert("Insufficient balance to buy");
      }
    } else {
      const asset = assets.find(a => a.key === commodity);
      if (asset.quantity >= finalQuantity) {
        updateAssets(commodity, action, finalQuantity, selectedPrice);
        alert(`Sold ${finalQuantity}g of ${commodity}`);
      } else {
        alert("Insufficient assets to sell");
      }
    }
  };

  return (
    <div className="buy-sell-form-container">
      <h2>{action === "buy" ? "Buy" : "Sell"} Commodities</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Commodity:
          <select value={commodity} onChange={(e) => setCommodity(e.target.value)} required>
            <option value="">Select</option>
            {TARGET_COMMODITIES.map((c) => (
              <option key={c.key} value={c.key}>{c.name}</option>
            ))}
          </select>
        </label>

        {commodity && (
          <div className="price-info">
            <p>Current Price: ${commoditiesData.rates[`USD${commodity}`]?.toFixed(4)}/g</p>
          </div>
        )}

        <label>
          Quantity (grams):
          <select value={quantity} onChange={(e) => setQuantity(e.target.value)} required>
            <option value="">Select</option>
            <option value="100">100g</option>
            <option value="250">250g</option>
            <option value="500">500g</option>
            <option value="1000">1000g</option>
            <option value="custom">Custom</option>
          </select>
        </label>

        {quantity === "custom" && (
          <label>
            Custom Quantity (grams):
            <input
              type="number"
              value={customQuantity}
              onChange={(e) => setCustomQuantity(e.target.value)}
              min="1"
              required
            />
          </label>
        )}

        <div className="form-actions">
          <button type="submit" className={`action-btn ${action === "buy" ? "buy-btn" : "sell-btn"}`}>
            {action === "buy" ? "Buy" : "Sell"}
          </button>
          <button
            type="button"
            className="switch-btn"
            onClick={() => setAction(action === "buy" ? "sell" : "buy")}
          >
            Switch to {action === "buy" ? "Sell" : "Buy"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuySellForm;
*/}
{/*
import React, { useState, useEffect } from 'react';
import './BuySellForm.css';

const BuySellForm = ({ balance, updateAssets, assets }) => {
  const [commoditiesData, setCommoditiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commodity, setCommodity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [action, setAction] = useState("buy");
  const [customQuantity, setCustomQuantity] = useState("");

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
    const finalQuantity = quantity === "custom" ? parseFloat(customQuantity) : parseFloat(quantity);
    const selectedPrice = commoditiesData.rates[`USD${commodity}`];
    const totalCost = selectedPrice * finalQuantity;

    if (action === "buy") {
      if (totalCost <= balance) {
        updateAssets(commodity, action, finalQuantity, selectedPrice);
        alert(`Bought ${finalQuantity}g of ${commodity}`);
      } else {
        alert("Insufficient balance to buy");
      }
    } else {
      const asset = assets.find(a => a.key === commodity);
      if (asset.quantity >= finalQuantity) {
        updateAssets(commodity, action, finalQuantity, selectedPrice);
        alert(`Sold ${finalQuantity}g of ${commodity}`);
      } else {
        alert("Insufficient assets to sell");
      }
    }
  };

  return (
    <div className="buy-sell-form-container">
      <h2>{action === "buy" ? "Buy" : "Sell"} Commodities</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Commodity:
          <select value={commodity} onChange={(e) => setCommodity(e.target.value)} required>
            <option value="">Select</option>
            {TARGET_COMMODITIES.map((c) => (
              <option key={c.key} value={c.key}>{c.name}</option>
            ))}
          </select>
        </label>

        {commodity && (
          <div className="price-info">
            <p>Current Price: ${commoditiesData.rates[`USD${commodity}`]?.toFixed(4)}/g</p>
          </div>
        )}

        <label>
          Quantity (grams):
          <select value={quantity} onChange={(e) => setQuantity(e.target.value)} required>
            <option value="">Select</option>
            <option value="100">100g</option>
            <option value="250">250g</option>
            <option value="500">500g</option>
            <option value="1000">1000g</option>
            <option value="custom">Custom</option>
          </select>
        </label>

        {quantity === "custom" && (
          <label>
            Custom Quantity (grams):
            <input
              type="number"
              value={customQuantity}
              onChange={(e) => setCustomQuantity(e.target.value)}
              min="1"
              required
            />
          </label>
        )}

        <div className="form-actions">
          <button type="submit" className={`action-btn ${action === "buy" ? "buy-btn" : "sell-btn"}`}>
            {action === "buy" ? "Buy" : "Sell"}
          </button>
          <button
            type="button"
            className="switch-btn"
            onClick={() => setAction(action === "buy" ? "sell" : "buy")}
          >
            Switch to {action === "buy" ? "Sell" : "Buy"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuySellForm;


{/*
import React, { useState, useEffect } from 'react';
import './BuySellForm.css';

const BuySellForm = ({ balance, setBalance, updateAssets, assets }) => {
  const [commoditiesData, setCommoditiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commodity, setCommodity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [action, setAction] = useState("buy");
  const [customQuantity, setCustomQuantity] = useState("");

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
    const finalQuantity = quantity === "custom" ? parseFloat(customQuantity) : parseFloat(quantity);
    const selectedPrice = commoditiesData.rates[`USD${commodity}`];
    const totalCost = selectedPrice * finalQuantity;

    if (action === "buy") {
      if (totalCost <= balance) {
        updateAssets(commodity, action, finalQuantity, selectedPrice);
        setBalance(balance - totalCost);
        alert(`Bought ${finalQuantity}g of ${commodity}`);
      } else {
        alert("Insufficient balance");
      }
    } else {
      const asset = assets.find(a => a.key === commodity);
      if (asset.quantity >= finalQuantity) {
        updateAssets(commodity, action, finalQuantity, selectedPrice);
        setBalance(balance + totalCost);
        alert(`Sold ${finalQuantity}g of ${commodity}`);
      } else {
        alert("Insufficient assets to sell");
      }
    }
  };

  return (
    <div className="buy-sell-form-container">
      <h2>{action === "buy" ? "Buy" : "Sell"} Commodities</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Commodity:
          <select value={commodity} onChange={(e) => setCommodity(e.target.value)} required>
            <option value="">Select</option>
            {TARGET_COMMODITIES.map((c) => (
              <option key={c.key} value={c.key}>{c.name}</option>
            ))}
          </select>
        </label>

        {commodity && (
          <div className="price-info">
            <p>Current Price: ${commoditiesData.rates[`USD${commodity}`]?.toFixed(4)}/g</p>
          </div>
        )}

        <label>
          Quantity (grams):
          <select value={quantity} onChange={(e) => setQuantity(e.target.value)} required>
            <option value="">Select</option>
            <option value="100">100g</option>
            <option value="250">250g</option>
            <option value="500">500g</option>
            <option value="1000">1000g</option>
            <option value="custom">Custom</option>
          </select>
        </label>

        {quantity === "custom" && (
          <label>
            Custom Quantity (grams):
            <input
              type="number"
              value={customQuantity}
              onChange={(e) => setCustomQuantity(e.target.value)}
              min="1"
              required
            />
          </label>
        )}

        <div className="form-actions">
          <button type="submit" className={`action-btn ${action === "buy" ? "buy-btn" : "sell-btn"}`}>
            {action === "buy" ? "Buy" : "Sell"}
          </button>
          <button
            type="button"
            className="switch-btn"
            onClick={() => setAction(action === "buy" ? "sell" : "buy")}
          >
            Switch to {action === "buy" ? "Sell" : "Buy"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuySellForm;

*/}
