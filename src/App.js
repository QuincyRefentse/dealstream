import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import home from './assets/home.svg';
import camera from './assets/camera.svg'; 
import report from './assets/report.svg'; 
import vault from './assets/vault.svg';
import './App.css';
import Home from './pages/Home'; 
import Report from './pages/Reports'; 
import Camera from './pages/Camera'; 
import BuySellForm from './components/BuySellForm';
import Assets from './components/Assets';

function App() {
  const [active, setActive] = useState(0);
  const [balance, setBalance] = useState(200);
  const [assets, setAssets] = useState([
    { name: 'Silver', key: 'XAG', quantity: 0 },
    { name: 'Gold', key: 'XAU', quantity: 0 },
    { name: 'Aluminium', key: 'ALU', quantity: 0 },
    { name: 'Coal', key: 'COAL', quantity: 0 },
    { name: 'Natural Gas', key: 'NG', quantity: 0 }
  ]);

  const updateAssets = (commodity, action, quantity, price) => {
    setAssets(prevAssets => {
      return prevAssets.map(asset => {
        if (asset.key === commodity) {
          const updatedQuantity = action === 'buy' ? asset.quantity + quantity : asset.quantity - quantity;
          return { ...asset, quantity: updatedQuantity };
        }
        return asset;
      });
    });

    const totalCost = price * quantity;
    if (action === 'buy') {
      setBalance(prevBalance => prevBalance - totalCost);
    } else if (action === 'sell') {
      setBalance(prevBalance => prevBalance + totalCost);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "JkcoOFgPutWV_eKNUErd5";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <div>
          <h1>
            {active === 0 ? "Home" : active === 1 ? "Reports" : "Camera"}
          </h1>
        </div>

        <nav className="navbar">
          <div className={active === 0 ? 'active' : ''} onClick={() => setActive(0)}>
            <Link to="/home">
              <img src={home} alt="Home" />
            </Link>
          </div>

          <div className={active === 1 ? 'active' : ''} onClick={() => setActive(1)}>
            <Link to="/reports">
              <img src={report} alt="Reports" />
            </Link>
          </div>

          <div className={active === 2 ? 'active' : ''} onClick={() => setActive(2)}>
            <Link to="/camera">
              <img src={camera} alt="Camera" />
            </Link>
          </div>
        </nav>

        <div className="auth-buttons">
          <SignedOut>
            <SignInButton>
              <button>Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <div className="account-balance">
          Balance: ${balance.toFixed(2)}
        </div>

        <div className="assets-button">
          <Link to="/assets">
            <button className="assets-btn">
              <img src={vault} alt="Assets" className="assets-icon" />
              <span className="assets-text">Assets</span>
            </button>
          </Link>
        </div>

        <Routes>
          <Route
            path="/home"
            element={<Home balance={balance} updateAssets={updateAssets} assets={assets} />}
          />
          <Route path="/reports" element={<Report />} />
          <Route path="/camera" element={<Camera />} />
          <Route
            path="/buy-sell"
            element={<BuySellForm balance={balance} updateAssets={updateAssets} assets={assets} />}
          />
          <Route path="/assets" element={<Assets assets={assets} />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;