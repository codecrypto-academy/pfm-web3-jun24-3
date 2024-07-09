import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { default as userManagementContractABIImport } from '../abi/UserManagementABI.json';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const roles = {
      1: 'Agricultor',                //0
      2: 'Bodegero',                  //1
      3: 'Transportista',             //2
      4: 'Vendedor',                  //3
      5: 'Admin',                     //4
      6: 'Cliente',                   //5
      7: 'Pendiente_Asignacion_Rol',  //6
	  };
    const roleList = Object.values(roles);

    //Metamask 
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [currentRole, setCurrentRole] = useState(null);

    //Smart contracts
    const userManagementContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const userManagementContractABI = userManagementContractABIImport;

    const [contractUser, setContractUser] = useState(null);
    const [users, setUsers] = useState([]);


    //METAMASK HOOKS
    //---------------------------------------
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
      }, [account]);


    return (
        <AppContext.Provider value={{ 
            account, setAccount, balance, setBalance, provider, setProvider, signer, setSigner,
            userManagementContractAddress, userManagementContractABI,
            contractUser, setContractUser, users, setUsers,
            currentRole, setCurrentRole, roles, roleList
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
