// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Connect from './components/Connect';
import Register from './components/Register'; // Import Register component

import './App.css';
import { getAccount, getBalance } from './metamask';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const handleConnectWallet = async () => {
    const result = await getAccount();
    if (result) {
      setAccount(result.account);
      const balance = await getBalance(result.account, result.provider);
      setBalance(balance);
    } else {
      console.error("Failed to connect wallet");
    }
  };

  return (
    <div className="App">
      <nav>
        <Link to="/">Home - </Link>
        <Link to="/about">About - </Link>
        <Link to="/connect">Connect</Link>
        {account && <Link to="/register">Register</Link>}
      </nav>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register account={account} />} /> {/* Register route */}
      </Routes>
    </div>
  );
}

export default App;
