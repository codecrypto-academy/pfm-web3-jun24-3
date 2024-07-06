import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useMetaMask = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

  
    useEffect(() => {
      const loadMetaMask = async () => {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          
          try {
            // Solicita la conexión con MetaMask
            await provider.send('eth_requestAccounts', []);
  
            // Obtén la cuenta y el balance
            const signer = provider.getSigner();
            const account = await signer.getAddress();
            const balance = await signer.getBalance();
  
            setAccount(account);
            setBalance(ethers.utils.formatEther(balance));
            setProvider(provider);
            setSigner(signer);
  
            // Escucha cambios en las cuentas
            window.ethereum.on('accountsChanged', async (accounts) => {
              if (accounts.length > 0) {
                const account = accounts[0];
                const balance = await provider.getBalance(account);
                setAccount(account);
                setBalance(ethers.utils.formatEther(balance));
              } else {
                setAccount(null);
                setBalance(null);
              }
            });
          } catch (error) {
            console.error('Error connecting to MetaMask:', error);
          }
        } else {
          console.error('MetaMask not detected');
        }
      };
  
      loadMetaMask();
    }, []);
  
    return { account, balance, provider, signer };
  };
  
  export default useMetaMask;