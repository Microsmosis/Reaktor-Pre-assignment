import NDZ_IMAGE from '../images/NDZ.png';

export const List = ({pilots}) => {
	const allPilots = pilots.map((pilot) => {
		return <div key={Math.floor(100000 + Math.random() * 900000)}>
					<p key={Math.floor(100000 + Math.random() * 900000)}>{pilot.firstname} {pilot.lastname}
						<br/>{pilot.phone_number}
						<br/>{pilot.email}<br/>
					</p>
			</div>
	});

	return (
		<div className='list-of-pilots'>
			<img src={NDZ_IMAGE} alt='' className='ndz-image'/>
			<h2>List of NDZ violators from the last 10 minutes</h2>
			{allPilots}
		</div>
	)
}