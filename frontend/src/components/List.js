export const List = ({pilots}) => {
	//console.log(pilots)
	const allPilots = pilots.map((pilot) => {
		return <div key={Math.floor(100000 + Math.random() * 900000)}>
					<p key={Math.floor(100000 + Math.random() * 900000)}>{pilot.firstname} {pilot.lastname}
						<br/>{pilot.phone_number}
						<br/>{pilot.email}<br/>
					</p>
			</div>
	});

	return (
		<>
			{allPilots}
		</>
	)
}