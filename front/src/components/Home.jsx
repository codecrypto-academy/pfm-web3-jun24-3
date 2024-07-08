import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAppContext  } from '../contexts/AppContext';
import useMetaMask from '../hooks/useMetaMask';
import useContracts from '../hooks/useContracts';
import { ethers } from 'ethers';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';


function Home() {

	//const {metaMaskHook, contractHook} = useAppContext();
	const metaMaskHook = useMetaMask();
    const contractHook = useContracts();

	const [selectedItem, setSelectedItem] = useState(null);

	
	const isNavItemEnabled = (role, allowedRole) => {
		return role === allowedRole;
	};

	useEffect(() => {

		const loadHome = async () =>{
			console.log('Loading Home component');
			console.log('Home: metaMaskHook.account -> ' + metaMaskHook.account);
			console.log('Home: metaMaskHook.balance -> ' + metaMaskHook.balance);
			console.log('Home: metaMaskHook.provider -> ' + metaMaskHook.provider);
			console.log('Home: metaMaskHook.signer -> ' + metaMaskHook.signer);
			console.log('Home: contractHook.userManagementContractAddress -> ' + contractHook.userManagementContractAddress);
			console.log('Home: contractHook.userManagementContractABIs -> ' + contractHook.userManagementContractABI);
			console.log('Home: contractHook.currentRole -> ' + contractHook.currentRole);
			
			//load contract user
			if(metaMaskHook.account){
				if(metaMaskHook.signer){
	
					const contractUser = new ethers.Contract(
						contractHook.userManagementContractAddress, 
						contractHook.userManagementContractABI, 
						metaMaskHook.signer);
						
					if(!contractUser)
						contractHook.setContractUser(contractUser);
		
					//load current user
					const userInfo =  await getCurrentUserRole(contractUser);
		
					if(userInfo){
						console.log('Home: userInfo.role -> ' + userInfo.role);
						contractHook.setCurrentRole(userInfo.role);
						console.log('Home: contractHook.currentRole -> ' + contractHook.currentRole);
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
			
	  }, [metaMaskHook.account]);

	  

	const getCurrentUserRole = async (contractUser) => {

		if(contractUser){

			const userInfo = await contractUser.getUserInfo(metaMaskHook.account);
			contractHook.setCurrentRole(userInfo.role);
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
							<li className={metaMaskHook.account ? '' : 'disabled'} onClick={() => handleItemClick('register')}>
								<Link className={selectedItem === 'register' ? 'nav-link active' : 'nav-link'} to={'/register'}>
									Register
								</Link>
							</li>
							<li className={metaMaskHook.account && isNavItemEnabled(contractHook.currentRole, 4) ? '' : 'disabled'}  onClick={() => handleItemClick('admin')}>
								<Link className={selectedItem === 'admin' ? 'nav-link active' : 'nav-link'} to={'/admin'}>
									Admin
								</Link>
							</li>
							<li className={metaMaskHook.account && isNavItemEnabled(contractHook.currentRole, 0) ? '' : 'disabled'}  onClick={() => handleItemClick('agricultor')}>
								<Link className={selectedItem === 'agricultor' ? 'nav-link active' : 'nav-link'} to={'/agricultor'}>
									Agricultor
								</Link>
							</li>
							<li className={metaMaskHook.account && isNavItemEnabled(contractHook.currentRole, 1) ? '' : 'disabled'}  onClick={() => handleItemClick('bodeguero')}>
								<Link className={selectedItem === 'bodegero' ? 'nav-link active' : 'nav-link'} to={'/bodeguero'}>
									Bodeguero
								</Link>
							</li>
							<li className={metaMaskHook.account && isNavItemEnabled(contractHook.currentRole, 2) ? '' : 'disabled'}  onClick={() => handleItemClick('transportista')}>
								<Link className={selectedItem === 'transportista' ? 'nav-link active' : 'nav-link'} to={'/transportista'}>
									Transportista
								</Link>
							</li>
							<li className={metaMaskHook.account && isNavItemEnabled(contractHook.currentRole, 3) ? '' : 'disabled'}  onClick={() => handleItemClick('vendedor')}>
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
