import React, {  useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAppContext } from '../contexts/AppContext';

const Admin = () => {

	const { metaMaskHook, contractHook} = useAppContext();

	useEffect(() => {
		const fetchAllUsers = async () => {

			try {
				
				const contractUsers = new ethers.Contract(
					contractHook.userManagementContractAddress, 
					contractHook.userManagementContractABI, 
					metaMaskHook.signer);

				const addresses = await contractUsers.getAllUsers();

				const usersInfo = await Promise.all(
					addresses.map(async (address) => {

						//console.log('useEffect fetchAllUsers - address:' + address);

						const userInfo = await contractUsers.getUserInfo(address);
						//console.log('useEffect fetchAllUsers - userInfo:' + userInfo);

						const rolesString = await contractUsers.getRolesAsString();
						//console.log('useEffect fetchAllUsers - rolesString:' + rolesString);

						return {
							address,
							role: rolesString[userInfo.role],
							email: userInfo.email,
							isRegistered: userInfo.isRegistered
						};
				}));
				
				contractHook.setUsers(usersInfo);
			} 
			catch (err) {
				console.error('Error in Admin.jsx: ', err);
			}
		};

		fetchAllUsers();
	}, []);

	const handleRoleChange = (e) => {
		contractHook.setRole(e.target.value);
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
						{contractHook.users.map((user) => (
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