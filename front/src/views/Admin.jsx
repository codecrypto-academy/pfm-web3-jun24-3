import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { getAccount } from '../metamask';
import userManagementContractABI from '../abi/UserManagementABI.json';
import { useWallet } from '../contexts/WalletContext';

// Anvil contract address
const userManagementContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Admin() {
	const { users, setUsers, setRole, setProvider, contract, setContract } = useWallet();

	useEffect(() => {
		const initEthers = async () => {
			const { provider } = await getAccount();
			const signer = provider.getSigner();
			setProvider(provider);
			setContract(new ethers.Contract(userManagementContractAddress, userManagementContractABI, signer));
		};

		initEthers();
	}, []);

	useEffect(() => {
		const fetchAllUsers = async () => {
			if (!contract) return;

			try {
				const addresses = await contract.getAllUsers();
				const usersInfo = await Promise.all(addresses.map(async (address) => {
					const userInfo = await contract.getUserInfo(address);
					const rolesString = await contract.getRolesAsString();
					return {
						address,
						role: rolesString[userInfo.role],
						email: userInfo.email,
						isRegistered: userInfo.isRegistered
					};
				}));
				setUsers(usersInfo);
			} catch (err) {
				console.error('Error in Admin.jsx: ', err);
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
				<table className="table table-bordered">
					<thead>
						<tr>
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
								<td>{user.isRegistered.toString()}</td>
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