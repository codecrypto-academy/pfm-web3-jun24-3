import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAppContext  } from '../contexts/AppContext';
import { ethers } from 'ethers';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';


function Home() {

	const {metaMaskHook, contractHook} = useAppContext();
	const [selectedItem, setSelectedItem] = useState(null);

	const isNavItemEnabled = (role, allowedRole) => {
		return role === allowedRole;
	};

	useEffect(() => {

		const loadHome = async () =>{
			console.log('Loading Home component');
			console.log('Home: contractHook.userManagementContractAddress -> ' + contractHook.userManagementContractAddress);
			console.log('Home: contractHook.userManagementContractABIs -> ' + contractHook.userManagementContractABI);
			console.log('Home: metaMaskHook.signer -> ' + metaMaskHook.signer);
	
			
			//load contract user
			if(metaMaskHook.account){
				if(metaMaskHook.signer){
	
					const contractUser = new ethers.Contract(
						contractHook.userManagementContractAddress, 
						contractHook.userManagementContractABI, 
						metaMaskHook.signer);
						
					if(!contractUser)
						contractHook.setContractUser(contractUser);
		
					console.log('Home: contractHook.setContractUser -> ' + contractHook.setContractUser);
					console.log('Home: metaMaskHook.account -> ' + metaMaskHook.account);
		
					//load current user
					const userInfo =  getCurrentUserRole(contractUser);
		
					if(userInfo){
						console.log('Home: contractHook.setRole(userInfo.role) -> ' + userInfo.role);
						contractHook.setRole(userInfo.role);
					}
		
				}
				else{
					console.log('Home: NO metaMaskHook.signer available');
				}
			}
			else{
				console.log('Home: NO metaMaskHook.account available');
			}
		
		};
		loadHome();
			
	  }, [contractHook.role]);

	  

	  const getCurrentUserRole = async (contractUser) => {
			if(contractUser){
				console.log('Home-getCurrentUserRole: contractUser.getUserInfo');
				const userInfo = await contractUser.getUserInfo(metaMaskHook.account);
				console.log('Home-getCurrentUserRole: contractUser.getUserInfo response: userInfo -> '+userInfo);
				contractHook.setRole(userInfo.role);
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
							<li className='nav-item' onClick={() => handleItemClick('register')}>
								<Link className={selectedItem === 'register' ? 'nav-link active' : 'nav-link'} to={'/register'}>
									Register
								</Link>
							</li>
							<li className={isNavItemEnabled(contractHook.role, 4) ? '' : 'disabled'} onClick={() => handleItemClick('admin')}>
								<Link className={selectedItem === 'admin' ? 'nav-link active' : 'nav-link'} to={'/admin'}>
									Admin
								</Link>
							</li>
							<li className={isNavItemEnabled(contractHook.role, 0) ? '' : 'disabled'} onClick={() => handleItemClick('agricultor')}>
								<Link className={selectedItem === 'agricultor' ? 'nav-link active' : 'nav-link'} to={'/agricultor'}>
									Agricultor
								</Link>
							</li>
							<li className={isNavItemEnabled(contractHook.role, 1) ? '' : 'disabled'} onClick={() => handleItemClick('bodeguero')}>
								<Link className={selectedItem === 'bodegero' ? 'nav-link active' : 'nav-link'} to={'/bodeguero'}>
									Bodeguero
								</Link>
							</li>
							<li className={isNavItemEnabled(contractHook.role, 2) ? '' : 'disabled'} onClick={() => handleItemClick('transportista')}>
								<Link className={selectedItem === 'transportista' ? 'nav-link active' : 'nav-link'} to={'/transportista'}>
									Transportista
								</Link>
							</li>
							<li className={isNavItemEnabled(contractHook.role, 3) ? '' : 'disabled'} onClick={() => handleItemClick('vendedor')}>
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
