import '../App.css';

export const ClosestViolator = ({violator}) => {
	if(violator){
		return (
			<div className='closest-violator'>
				<h1 className='pilot-info'>Closest confirmed distance to the nest</h1>
				<h2>Distance from nest : {Math.floor(violator.distance_to_nest ) / 1000}m</h2>
			</div>
		)
	} else {
		return (
			<div className='center-loading-animation'>
				<div className='lds-dual-ring'></div>
			</div>
		)
	}
}