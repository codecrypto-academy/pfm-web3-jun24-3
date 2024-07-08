import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAppContext  } from '../contexts/AppContext';
import { ethers } from 'ethers';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';


function Home() {

	const { account, setAccount, balance, setBalance, provider, setProvider, signer, setSigner,
		userManagementContractAddress, userManagementContractABI,
		contractUser, setContractUser, users, setUsers,
		currentRole, setCurrentRole,roles } = useAppContext();

	const [selectedItem, setSelectedItem] = useState(null);

	
	const isNavItemEnabled = (role, allowedRole) => {
		return role === allowedRole;
	};

	useEffect(() => {

		const loadHome = async () =>{
			console.log('Loading Home component');
			console.log('Home: account -> ' + account);
			console.log('Home: balance -> ' + balance);
			console.log('Home: provider -> ' + provider);
			console.log('Home: signer -> ' + signer);
			console.log('Home: userManagementContractAddress -> ' + userManagementContractAddress);
			console.log('Home: userManagementContractABIs -> ' + userManagementContractABI);
			console.log('Home: currentRole -> ' + currentRole);
			
			//load contract user
			if(account){
				if(signer){
	
					const contractUser = new ethers.Contract(
						userManagementContractAddress, 
						userManagementContractABI, 
						signer);
						
					if(!contractUser)
						setContractUser(contractUser);
		
					//load current user
					const userInfo =  await getCurrentUserRole(contractUser);
		
					if(userInfo){
						console.log('Home: userInfo.role -> ' + userInfo.role);
						setCurrentRole(userInfo.role);
						console.log('Home: currentRole -> ' + currentRole);
					}
		
				}
				else{
					console.log('Home: NO signer available');
				}
			}
			else{
				console.log('Home: NO account available');
			}
		
		};
		loadHome();
			
	  }, [account]);

	  

	const getCurrentUserRole = async (contractUser) => {

		if(contractUser){

			const userInfo = await contractUser.getUserInfo(account);
			setCurrentRole(userInfo.role);
			return userInfo;
		}
		else{
			console.log('Home-getCurrentUserRole: NO contractUser avaliable');
		}
		
	}


	const handleItemClick = (itemName) => {
		setSelectedItem(itemName);
	};

	return (
		<div className='Home'>
			<Header />
			<nav className='navbar navbar-expand-lg navbar-dark bg-secondary'>
				<div className='container'>
					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav'>
							<li className={account ? '' : 'disabled'} onClick={() => handleItemClick('register')}>
								<Link className={selectedItem === 'register' ? 'nav-link active' : 'nav-link'} to={'/register'}>
									Register
								</Link>
							</li>
							<li className={account && isNavItemEnabled(currentRole, 4) ? '' : 'disabled'}  onClick={() => handleItemClick('admin')}>
								<Link className={selectedItem === 'admin' ? 'nav-link active' : 'nav-link'} to={'/admin'}>
									Admin
								</Link>
							</li>
							<li className={account && isNavItemEnabled(currentRole, 0) ? '' : 'disabled'}  onClick={() => handleItemClick('agricultor')}>
								<Link className={selectedItem === 'agricultor' ? 'nav-link active' : 'nav-link'} to={'/agricultor'}>
									Agricultor
								</Link>
							</li>
							<li className={account && isNavItemEnabled(currentRole, 1) ? '' : 'disabled'}  onClick={() => handleItemClick('bodeguero')}>
								<Link className={selectedItem === 'bodegero' ? 'nav-link active' : 'nav-link'} to={'/bodeguero'}>
									Bodeguero
								</Link>
							</li>
							<li className={account && isNavItemEnabled(currentRole, 2) ? '' : 'disabled'}  onClick={() => handleItemClick('transportista')}>
								<Link className={selectedItem === 'transportista' ? 'nav-link active' : 'nav-link'} to={'/transportista'}>
									Transportista
								</Link>
							</li>
							<li className={account && isNavItemEnabled(currentRole, 3) ? '' : 'disabled'}  onClick={() => handleItemClick('vendedor')}>
								<Link className={selectedItem === 'vendedor' ? 'nav-link active' : 'nav-link'} to={'/vendedor'}>
									Vendedor
								</Link>
							</li>
						</ul>
						<style>{`
							.disabled {
							opacity: 0.5;
							pointer-events: none;
							}
						`}</style>
					</div>
				</div>
			</nav>

			<div className='container'>
				<Outlet />
			</div>

			<Footer />
		</div>
	);
}

export default Home;
