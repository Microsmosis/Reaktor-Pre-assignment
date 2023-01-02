import '../App.css';
import radar from '../images/radar.png'

export const Header = () => {
	return (
		<div>
			<div className='banner'>
				<img src={radar} alt='' className='radar'/>
				<span className='guardbird'>GUARDB1RD</span>
			</div>
			<div className='header'>
				<p>VIOLATORS OF THE NDZ</p>
			</div>
		</div>
	)
}