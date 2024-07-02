import React, { createContext, useContext, useState } from 'react';
export { default as userManagementContractABI } from '../abi/UserManagementABI.json';

const WalletContext = createContext();

// Anvil contract address
export const userManagementContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";



export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    return (
        <WalletContext.Provider value={{ account, setAccount, balance, setBalance, users, setUsers, role, setRole, provider, setProvider, contract, setContract }}>
            {children}
        </WalletContext.Provider>
    );
};