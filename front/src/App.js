import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { getAccount, getBalance } from './metamask';
import './App.css';
import Register from './components/Register';

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
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>MetaMask Integration with React</h1>
          {!account ? (
            <button onClick={handleConnectWallet}>Connect Wallet</button>
          ) : (
            <div>
              <p>Connected Account: {account}</p>
              <p>Balance: {balance !== null ? `${balance} ETH` : "Loading balance..."}</p>
              {/* Show Register link only when the wallet is connected */}
              <nav>
                <Link to="/register">
                  <button className="register-button">Registro de Nuevo Usuario</button>
                </Link>
              </nav>
            </div>
          )}
        </header>
        <Routes>
          {/* Define routes here */}
          <Route path="/register" element={<Register account={account} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
