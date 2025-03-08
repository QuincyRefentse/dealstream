import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import home from './assets/home.svg';
import camera from './assets/camera.svg'; // You can keep this icon, or change it to something related to reports
import report from './assets/report.svg'; // You can keep this icon, or change it to something related to cameras
import './App.css';
import Home from './pages/Home'; // Import Home page
import Report from './pages/Reports'; // Import Report page
import Camera from './pages/Camera'; // Import Camera page

function App() {
  const [active, setActive] = useState(0);

  return (
    <Router>
      <div className="App">
        <div>
          <h1>
            {['', '', ''][active] }
          </h1>
        </div>

        <nav className="navbar">
          <div
            className={active === 0 ? 'active' : ''}
            onClick={() => setActive(0)}
          >
            <Link to="/home"> {/* Link to Home route */}
              <img src={home} alt="Home" />
            </Link>
          </div>

          <div
            className={active === 1 ? 'active' : ''}
            onClick={() => setActive(1)}
          >
            <Link to="/reports"> {/* Link to Reports route */}
              <img src={report} alt="Reports" />
            </Link>
          </div>

          <div
            className={active === 2 ? 'active' : ''}
            onClick={() => setActive(2)}
          >
            <Link to="/camera"> {/* Link to Camera route */}
              <img src={camera} alt="Camera" />
            </Link>
          </div>
        </nav>

        <div>
          <Routes>
            <Route path="/home" element={<Home />} /> {/* Home route */}
            <Route path="/reports" element={<Report />} /> {/* Report route */}
            <Route path="/camera" element={<Camera />} /> {/* Camera route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


