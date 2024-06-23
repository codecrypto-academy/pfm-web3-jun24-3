import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccount, getBalance } from '../metamask';

const Connect = ({ account, setAccount, balance, setBalance }) => { // Changed to destructuring props
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    const result = await getAccount();
    if (result) {
      setAccount(result.account);
      setBalance(await getBalance(result.account, result.provider));
      //navigate('/register'); // Uncommented to navigate after connection
    } else {
      console.error("Failed to connect wallet");
    }
  };

  const handleNavigate = () => {
    navigate('/register');
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
          <p>Balance: {balance !== null ? `${balance} ETH` : "Loading balance..."}</p>
          <nav>
            <button onClick={handleNavigate}>Registrarse</button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Connect;