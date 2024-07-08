import React, {  useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAppContext } from '../contexts/AppContext';
import useMetaMask from '../hooks/useMetaMask';
import useContracts from '../hooks/useContracts';

const Admin = () => {

	const { metaMaskHook, contractHook} = useAppContext();
	//const metaMaskHook = useMetaMask();
    //const contractHook = useContracts();

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

						const userInfo = await contractUsers.getUserInfo(address);
						const rolesString = await contractUsers.getRolesAsString();

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

	const handleRoleChange = (newRole) => {
		console.log('Admin.jsx: handleRoleChange. newRole: ' + newRole);
		contractHook.setCurrentRole(newRole);
	};

	const handleClickAsignRole = () => {
		//contractHook.setRole(e.target.value);
		console.log('Admin.jsx: handleClickAsignRole. Assign new role: ' + contractHook.currentRole);
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
							<th scope="col">Current Role</th>
							<th scope="col">New Role</th>
						</tr>
					</thead>
					<tbody>
						{contractHook.users.map((user) => (
							<tr key={user.address}>
								<td>{user.address}</td>
								<td>{user.email}</td>
								<td>{user.isRegistered.toString()}</td>
								<td>{user.role}</td>
								<td>{
									<select
										onChange={(e) => handleRoleChange(e.target.value)}>
										{contractHook.roles.map((role) => (
											<option key={role.roleId} value={role.roleId}>
											{role.roleString}
											</option>
										))}
									</select>
									
								}</td>
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