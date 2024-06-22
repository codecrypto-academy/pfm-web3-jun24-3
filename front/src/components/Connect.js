// src/components/Connect.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAccount, getBalance } from '../metamask';

function Connect() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    const result = await getAccount();
    if (result) {
      setAccount(result.account);
      const balance = await getBalance(result.account, result.provider);
      setBalance(balance);
      navigate('/register'); // Navigate to the Register page
    } else {
      console.error("Failed to connect wallet");
    }
  };

  return (
    <div>
      <h2>Connect</h2>
      <h1>MetaMask Integration with React</h1>
      {!account ? (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          {/* <p>Balance: {balance !== null ? `${balance} ETH` : "Loading balance..."}</p> */}
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/connect">Connect</Link>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Connect;
