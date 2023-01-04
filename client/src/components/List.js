import '../App.css';
import ndz_image from '../images/NDZ.png';
import phone_icon from '../images/phone-icon.png'

export const List = ({pilots}) => {
	const allPilots = pilots.map((pilot) => {
		return <div key={pilot.id} className='card'>
					<p key={pilot.id} className='pilot-info'>{pilot.firstname} {pilot.lastname}</p>
					<p className='pilot-number'>{pilot.phone_number}</p>
					<img src={phone_icon} className='phone-icon'/>
					<p>{pilot.email}</p>
			   </div>
	});

	return (
		<div className='list-of-pilots'>
			<img src={ndz_image} className='ndz-image'/>
			<h2>Recent Violators</h2>
			<p className='info'>Information from the last 10 minutes</p>
			{allPilots}
		</div>
	);
};