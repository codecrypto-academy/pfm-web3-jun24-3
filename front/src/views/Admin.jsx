import React, {  useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAppContext } from '../contexts/AppContext';

const Admin = () => {

	const { account, setAccount, balance, setBalance, provider, setProvider, signer, setSigner,
		userManagementContractAddress, userManagementContractABI,
		contractUser, setContractUser, users, setUsers,
		currentRole, setCurrentRole,roles, roleList } = useAppContext();

	useEffect(() => {
		const fetchAllUsers = async () => {

			try {
				
				const contractUsers = new ethers.Contract(
					userManagementContractAddress, 
					userManagementContractABI, 
					signer);

				const addresses = await contractUsers.getAllUsers();

				const usersInfo = await Promise.all(
					addresses.map(async (address) => {

						const userInfo = await contractUsers.getUserInfo(address);
						const rolesString = await contractUsers.getRolesAsString();

						return {
							address,
							role: rolesString[userInfo.role],
							email: userInfo.email,
							isRegistered: userInfo.isRegistered
						};
				}));
				
				setUsers(usersInfo);
			} 
			catch (err) {
				console.error('Error in Admin.jsx: ', err);
			}
		};

		fetchAllUsers();
	}, []);

	const handleRoleChange = (e) => {
		setCurrentRole(e.target.value);
	  };

	const handleClickAsignRole = () => {
		//contractHook.setRole(e.target.value);
		console.log('Admin.jsx: handleClickAsignRole. Assign new role: ' + currentRole);
	};

	return (
		<div className='bg-white text-black text-center py-4 '>
			<div className='bg-light border p-2'>
				<h3>USERS ADMIN</h3>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th scope="col">Address</th>
							<th scope="col">Email</th>
							<th scope="col">Registered</th>
							<th scope="col">Role</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.address}>
								<td>{user.address}</td>
								<td>{user.email}</td>
								<td>{user.isRegistered.toString()}</td>
								<td>{user.role}</td>
							</tr>
						))}
					</tbody>
				</table>
				<button className='btn btn-dark' id="storeSelected" onClick={handleClickAsignRole}>Assign Role</button>
			</div>
		</div>
	);
}

export default Admin;