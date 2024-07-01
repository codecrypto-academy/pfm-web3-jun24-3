
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import userManagementContractABI from '../abi/UserManagementABI.json';

// Anvil contract address
const userManagementContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Admin() {


	const [users, setUsers] = useState([]);
	const [role, setRole] = useState('');
	const [provider, setProvider] = useState(null);
	const [contract, setContract] = useState(null);

	useEffect(() => {
		const initEthers = async () => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(userManagementContractAddress, userManagementContractABI, signer);
			setProvider(provider);
			setContract(contract);
		};
	
		initEthers();
	  }, []);

	useEffect(() => {
		const fetchAllUsers = async () => {
			if (!contract) return;
			
			try{
				const addresses = await contract.getAllUsers();
				//contract.getAllUsers().then((users)=>setUsers(users));
				const usersInfo = await Promise.all(addresses.map(async (address) => {
					const userInfo = await contract.getUserInfo(address);
					return {
					  address,
					  role: userInfo.role,
					  email: userInfo.email,
					  isRegistered: userInfo.isRegistered
					};
				  }));
				  setUsers(usersInfo);
			}
			catch(err){
				console.error('Error in Admin,jsx: ', err);
			}
			
		};

		fetchAllUsers();
	}, [contract]);
	
	const handleRoleChange = (e) => {
		setRole(e.target.value);
	};

	return (
		<div className='bg-white text-black text-center py-4 '>
		<div className='bg-light border p-2'>
			<h3>USERS ADMIN</h3>
			<table class="table table-bordered">
				<thead>
					<tr >
						<th scope="col">Email</th>
						<th scope="col">Role</th>
						<th scope="col">Registered</th>
					</tr>
				</thead>
				<tbody>
				{users.map((user) => (
					<tr key={user.address}>
						<td>{user.email}</td>
						<td>{user.role}</td>
						<td>{user.isRegistered}</td>
					</tr>
				))}
				</tbody>
			</table>
			<button className='btn btn-dark' id="storeSelected">Assign Role</button>
			
		</div>
		</div>
	);
}


export default Admin;
