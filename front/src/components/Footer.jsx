import { Link } from 'react-router-dom';
function Footer() {
	return (
		<footer className='bg-dark text-white text-center py-3 fixed-bottom'>
			<div className='container'>
				<ul className='list-inline'>
					<li className='list-inline-item'>
						<Link to={'/'}>Home</Link>
					</li>
					<li className='list-inline-item'>
						<Link to={'/about'}>About</Link>
					</li>
					<li className='list-inline-item'>
						<Link to={'/privacy'}>Privacy</Link>
					</li>
					<li className='list-inline-item'>
						<Link to={'/terms'}>Terms & Conditions</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}
export default Footer;
