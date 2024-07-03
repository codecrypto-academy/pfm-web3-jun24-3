import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccount, getBalance } from '../hooks/metamask';
import { useWallet } from '../contexts/WalletContext';

const Connect = () => {
  const { account, setAccount, balance, setBalance } = useWallet();
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
    <div className='bg-white text-black text-center py-4 '>
      <div className='bg-light border p-2'>
        {!account ? (
          <button className='btn btn-dark' onClick={handleConnectWallet}>Connect Wallet</button>
        ) : (
          <div>
            <h5>Connected Account</h5>
            <h6>{account}</h6>
            <h5>Balance: </h5>
            <h6>{balance !== null ? `${balance} ETH` : "Loading balance..."}</h6>
            <nav>
              <button className='btn btn-dark' onClick={handleNavigate}>Registrarse</button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connect;