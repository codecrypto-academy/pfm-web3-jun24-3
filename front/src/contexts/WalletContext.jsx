import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

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