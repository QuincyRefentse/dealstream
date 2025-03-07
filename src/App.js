import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import home from './assets/home.svg';
import rss from './assets/rss.svg'; // You can keep this icon, or change it to something related to reports
import user from './assets/user.svg'; // You can keep this icon, or change it to something related to cameras
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
              <img src={rss} alt="Reports" />
            </Link>
          </div>

          <div
            className={active === 2 ? 'active' : ''}
            onClick={() => setActive(2)}
          >
            <Link to="/camera"> {/* Link to Camera route */}
              <img src={user} alt="Camera" />
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



{/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import home from './assets/home.svg';
import rss from './assets/rss.svg';
import user from './assets/user.svg';
import './App.css';
import Home from './pages/Home'; // Import Home page
import Feed from './pages/Reports'; // Import Feed page (create this if it doesn't exist)
import User from './pages/Camera'; // Import User page (create this if it doesn't exist)

function App() {
  const [active, setActive] = useState(0);

  return (
    <Router>
      <div className="App">
        <div>
          <h1>
            {['Home', 'Feed', 'User'][active]}
          </h1>
        </div>

        <nav className="navbar">
          <div
            className={active === 0 ? 'active' : ''}
            onClick={() => setActive(0)}
          >
            <Link to="/"> {/* Link to Home route *
              <img src={home} alt="Home" />
            </Link>
          </div>

          <div
            className={active === 1 ? 'active' : ''}
            onClick={() => setActive(1)}
          >
            <Link to="/feed"> {/* Link to Feed route *
              <img src={rss} alt="Camera" />
            </Link>
          </div>

          <div
            className={active === 2 ? 'active' : ''}
            onClick={() => setActive(2)}
          >
            <Link to="/user"> {/* Link to User route *
              <img src={user} alt="Reports" />
            </Link>
          </div>
        </nav>

        <div>
          <Switch>
            <Route path="/" exact component={Home} /> {/* Home route *
            <Route path="/feed" exact component={Feed} /> {/* Feed route *
            <Route path="/user" exact component={User} /> {/* User route 
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
*/}