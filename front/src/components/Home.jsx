import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

//import logo from '../assets/W3ETHG3-logo.svg';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

import { useWallet, userManagementContractABI, userManagementContractAddress } from '../contexts/WalletContext';

function Home() {


	const { account, role, setRole, contract } = useWallet();
	const [selectedItem, setSelectedItem] = useState(null);
	const initRole = async () => {
		if (!contract || !account) return;
		const userInfo = await contract.getUserInfo(account);
		console.log(userInfo.role);
		setRole(userInfo.role);
	};

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
							<li className='nav-item' onClick={() => handleItemClick('connect')}>
								<Link className={selectedItem === 'connect' ? 'nav-link active' : 'nav-link'} to={'/connect'}>
									Connect
								</Link>
							</li>
							<li className='nav-item' onClick={() => handleItemClick('admin')}>
								<Link className={selectedItem === 'admin' ? 'nav-link active' : 'nav-link'} to={'/admin'}>
									Admin
								</Link>
							</li>
							<li className='nav-item' onClick={() => handleItemClick('agricultor')}>
								<Link className={selectedItem === 'agricultor' ? 'nav-link active' : 'nav-link'} to={'/agricultor'}>
									Agricultor
								</Link>
							</li>
							<li className='nav-item' onClick={() => handleItemClick('bodeguero')}>
								<Link className={selectedItem === 'bodegero' ? 'nav-link active' : 'nav-link'} to={'/bodeguero'}>
									Bodeguero
								</Link>
							</li>
							<li className='nav-item' onClick={() => handleItemClick('transportista')}>
								<Link className={selectedItem === 'transportista' ? 'nav-link active' : 'nav-link'} to={'/transportista'}>
									Transportista
								</Link>
							</li>
							<li className='nav-item' onClick={() => handleItemClick('vendedor')}>
								<Link className={selectedItem === 'vendedor' ? 'nav-link active' : 'nav-link'} to={'/vendedor'}>
									Vendedor
								</Link>
							</li>
						</ul>
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
