import React, { createContext, useContext, useState } from 'react';
import useMetaMask from '../hooks/useMetaMask';
import useContracts from '../hooks/useContracts';



const AppContext = createContext();


export const AppContextProvider = ({ children }) => {


    const metaMaskHook = useMetaMask();
    const contractHook = useContracts();

    return (
        <AppContext.Provider value={{ metaMaskHook, contractHook }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
