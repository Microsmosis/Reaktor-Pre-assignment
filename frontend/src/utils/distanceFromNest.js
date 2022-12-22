export const checkDistanceFromNest = (violators) => {
	if(violators?.length) {
		const closest = violators.reduce((curr, prev) => {
			return prev.distance_to_nest < curr.distance_to_nest ? prev : curr;
		});
		return closest;
	}
}
