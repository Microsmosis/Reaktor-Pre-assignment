import '../App.css';
import background_image from '../images/background.png';

export const BackgroundImage = () => {
	return (
		<div>
			<img src={background_image} className='background-image'/>
		</div>
	);
};