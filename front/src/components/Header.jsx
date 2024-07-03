import image from '../assets/image2.png';
import metamaskLogo from '../assets/logo-metamask.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useWallet  } from '../contexts/WalletContext';


function Header() {

	const { account, balance } = useWallet();
	
	return (
		<div className='bg-dark text-white text-center d-flex align-items-start justify-content-center py-4' >

			<div className="position-absolute start-0 ps-3">

				<table className="bg-dark">
					<tbody>
						<tr>
							<td>
								<img src={metamaskLogo}  width='50%' />
							</td>
							<td>
								{account ? (
									<div>
										<table className="bg-dark text-white  table-bordered border-light">
											<tbody>
											<tr>
												<td className="text-start">Account</td>
												<td className="text-start">{account}</td>
											</tr>
											<tr>
												<td className="text-start">Balance  </td>
												<td className="text-start">{balance} ETH</td>
											</tr>
											</tbody>
										</table>
									</div>
								) : (
									<p>Loading...</p>
								)}
							</td>
						</tr>
						</tbody>
				</table>
			</div>

			<div className="m-0">
				<h1 className='bg-dark text-white py-4' >
				WINE TRACKING TOOL
				</h1>
				<div>
				<img src={image} width='100%%' />
				</div>
				
			</div>

		</div>	
	);
}
export default Header;
