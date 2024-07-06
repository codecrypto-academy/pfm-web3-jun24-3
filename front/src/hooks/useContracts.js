import { useState, useEffect } from 'react';
//import { ethers } from 'ethers';
import { default as userManagementContractABIImport } from '../abi/UserManagementABI.json';


const useContracts = () => {


    // Anvil contract address
    const userManagementContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const userManagementContractABI = userManagementContractABIImport;

    /* TO COMPLETE
    const trackManagementContractAddress = "TBD";
    const trackManagementContractABI = TBD;
    */

    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');


    useEffect(() => {

        const loadContracts = async () => {

        };

        loadContracts();
    }, []);

    return {
        userManagementContractAddress, userManagementContractABI, 
        //trackManagementContractAddress, trackManagementContractABI, 
        users, setUsers,
        role, setRole,
    };
};



 export default useContracts;