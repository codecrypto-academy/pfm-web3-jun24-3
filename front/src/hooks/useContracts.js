import { useState } from 'react';
import { default as userManagementContractABIImport } from '../abi/UserManagementABI.json';


const useContracts = () => {

    const roles = [
		{ roleId: '0', roleString: 'Agricultor' },
		{ roleId: '1', roleString: 'Bodegero' },
		{ roleId: '2', roleString: 'Transportista' },
		{ roleId: '3', roleString: 'Vendedor' },
		{ roleId: '4', roleString: 'Admin' },
		{ roleId: '5', roleString: 'Cliente' },
		{ roleId: '6', roleString: 'Pendiente_Asignacion_Rol' }
	];

    // Anvil contract address
    const userManagementContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const userManagementContractABI = userManagementContractABIImport;
    const [contractUser, setContractUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [currentRole, setCurrentRole] = useState(null);

    /* TO COMPLETE
    const trackManagementContractAddress = "TBD";
    const trackManagementContractABI = TBD;
    */



    return {
        userManagementContractAddress, userManagementContractABI, 
        contractUser, setContractUser,
        //trackManagementContractAddress, trackManagementContractABI,
        users,setUsers,
        roles, currentRole, setCurrentRole
    };
};



 export default useContracts;