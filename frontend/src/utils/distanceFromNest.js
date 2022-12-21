export const checkDistanceFromNest = (violators) => {
	if(violators?.length) {
		const closest = violators.reduce((curr, prev) => {
			return prev.distanceToNest < curr.distanceToNest ? prev : curr;
		});
		return closest;
	}
}
