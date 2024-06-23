import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Connect from './components/Connect';
import Register from './components/Register';

import './App.css';

function App() {

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home - </Link>
          <Link to="/about">About - </Link>
          <Link to="/connect">Connect</Link>
        </nav>
        <Routes> {/* Correct usage of Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/connect" element={<Connect account={account} setAccount={setAccount} balance={balance} setBalance={setBalance} />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register account={account} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;