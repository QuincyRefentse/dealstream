import React from 'react';
import './Assets.css';

function Assets({ assets }) {
  return (
    <div className="assets-container">
      <h2 className="assets-heading">Your Assets</h2>
      <ul className="assets-list">
        {assets.map((asset) => (
          <li key={asset.key} className="asset-item">
            <div className="asset-details">
              <strong className="asset-name">{asset.name}</strong>: 
              <span className="asset-quantity">{asset.quantity} units</span>
              <span className="asset-price"> @ ${asset.price} per unit</span>
            </div>
            <div className="asset-total">
              Total Value: <span className="asset-total-value">${(asset.quantity * asset.price).toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assets;

{/*
import React from 'react';
import './Assets.css';

function Assets({ assets }) {
  return (
    <div className="assets-container">
      <h2 className="assets-heading">Your Assets</h2>
      <ul className="assets-list">
        {assets.map((asset) => (
          <li key={asset.key} className="asset-item">
            <div className="asset-details">
              <strong className="asset-name">{asset.name}</strong>: 
              <span className="asset-quantity">{asset.quantity} units</span>
              <span className="asset-price"> @ ${asset.price} per unit</span>
            </div>
            <div className="asset-total">
              Total Value: <span className="asset-total-value">${(asset.quantity * asset.price).toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assets;


*/}