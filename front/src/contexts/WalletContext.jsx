import React, { createContext, useContext, useState } from 'react';
import useMetaMask from '../hooks/useMetaMask';

export { default as userManagementContractABI } from '../abi/UserManagementABI.json';

const WalletContext = createContext();

// Anvil contract address
export const userManagementContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";




export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    const metaMask = useMetaMask();

    return (
        <WalletContext.Provider value={metaMask}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};
