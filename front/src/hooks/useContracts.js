import { useState } from 'react';
import { default as userManagementContractABIImport } from '../abi/UserManagementABI.json';


const useContracts = () => {


    // Anvil contract address
    const userManagementContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const userManagementContractABI = userManagementContractABIImport;
    const [contractUser, setContractUser] = useState('');

    /* TO COMPLETE
    const trackManagementContractAddress = "TBD";
    const trackManagementContractABI = TBD;
    */

    


    return {
        userManagementContractAddress, userManagementContractABI, 
        contractUser, setContractUser,
        //trackManagementContractAddress, trackManagementContractABI, 
    };
};



 export default useContracts;