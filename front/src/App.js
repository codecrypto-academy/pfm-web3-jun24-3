import React, { useState } from 'react';
import { getAccount, getBalance } from './metamask';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const handleConnectWallet = async () => {
    console.log("Connecting to wallet...");
    const result = await getAccount();
    if (result) {
      console.log("Setting Account State:", result.account);
      setAccount(result.account);
      const balance = await getBalance(result.account, result.provider);
      console.log("Setting Balance State:", balance);
      setBalance(balance);
    } else {
      console.error("Failed to connect wallet");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MetaMask Integration with React</h1>
        {!account ? (
          <button onClick={handleConnectWallet}>Connect Wallet</button>
        ) : (
          <div>
            <p>Connected Account: {account}</p>
            <p>Balance: {balance !== null ? `${balance} ETH` : "Loading balance..."}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
