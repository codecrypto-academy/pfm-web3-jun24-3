import image from '../assets/image2.png';
function Header() {
	return (
		<div className='bg-dark text-black text-center py-4' >
			<h2 className='bg-dark text-white py-4' >
			WINE TRACKING TOOL
			</h2>
			<img src={image} width='100%%' />
		</div>	
	);
}
export default Header;
