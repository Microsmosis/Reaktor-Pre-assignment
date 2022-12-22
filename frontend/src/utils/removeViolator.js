export const removeViolator = (violators) => {
	const currentViolators = violators.filter((violator) => {
		if(violator.violationTime + 600000 > Date.now()) // double check that this time thing works
			return violator
	});
	return currentViolators;
};
