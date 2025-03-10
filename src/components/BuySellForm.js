import React, { useState } from "react";

const BuySellForm = () => {
  const [commodity, setCommodity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [action, setAction] = useState("buy"); // "buy" or "sell"

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send this data to the API to process the transaction
    console.log(`Action: ${action}, Commodity: ${commodity}, Quantity: ${quantity}, Price: ${price}`);
  };

  return (
    <div style={{ padding: "20px", background: "#e9e9e9", marginTop: "20px" }}>
      <h2>{action === "buy" ? "Buy" : "Sell"} Commodities</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Choose Commodity:
          <select value={commodity} onChange={(e) => setCommodity(e.target.value)}>
            <option value="coal">Coal</option>
            <option value="copper">Copper</option>
            <option value="chrome">Chrome</option>
            <option value="platinum">Platinum</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
        </label>
        <br />
        <label>
          Quantity In KILOGRAMS (KG):
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0.01"
            step="0.01"
            required
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
