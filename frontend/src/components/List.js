import { removeViolator } from "../utils/removeViolator";

export const List = ({pilots}) => {
	const filteredPilots = removeViolator(pilots);

	const test = filteredPilots.map((pilot) => {
		return <div key={Math.floor(100000 + Math.random() * 900000)}>
					<p key={Math.floor(100000 + Math.random() * 900000)}>{pilot.firstName}
						<br/>{pilot.lastName}
						<br/>{pilot.phoneNumber}
						<br/>{pilot.email}<br/>
					</p>
			</div>
	});

	return (
		<>
			{test}
		</>
	)
}