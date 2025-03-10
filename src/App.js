import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import home from './assets/home.svg';
import camera from './assets/camera.svg'; 
import report from './assets/report.svg'; 
import './App.css';
import Home from './pages/Home'; 
import Report from './pages/Reports'; 
import Camera from './pages/Camera'; 

function App() {
  const [active, setActive] = useState(0);

  return (
    <Router>
      <div className="App">
        <div>
          <h1>
            {['', '', ''][active]}
          </h1>
        </div>

        <nav className="navbar">
          <div
            className={active === 0 ? 'active' : ''}
            onClick={() => setActive(0)}
          >
            <Link to="/home">
              <img src={home} alt="Home" />
            </Link>
          </div>

          <div
            className={active === 1 ? 'active' : ''}
            onClick={() => setActive(1)}
          >
            <Link to="/reports">
              <img src={report} alt="Reports" />
            </Link>
          </div>

          <div
            className={active === 2 ? 'active' : ''}
            onClick={() => setActive(2)}
          >
            <Link to="/camera">
              <img src={camera} alt="Camera" />
            </Link>
          </div>
        </nav>

        {/* Authentication Buttons */}
        <div className="auth-buttons">
          <SignedOut>
            {/* Sign-In button, when the user is not signed in */}
            <SignInButton>
              <button>Sign In</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* UserButton, shown when the user is signed in */}
            <UserButton />
          </SignedIn>
        </div>

        <div>
          {/* Routes for the app */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/camera" element={<Camera />} />

            {/* Redirecting to home by default */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Optionally, add a fallback for unknown routes */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
