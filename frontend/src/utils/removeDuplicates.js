export const removeDuplicates = (arr1, arr2) => {
	return arr1.filter(function(obj1) {
	  return !arr2.some(function(obj2) {
		return obj1['serialNumber'] === obj2['serialNumber'];
	  });
	});
}
