import '../App.css';

export const ClosestDistance = ({distance}) => {
	if(distance){
		return (
			<div className='closest-distance'>
				<p className='pilot-info'>Closest confirmed distance to the nest</p>
				<h2>Distance : {Math.floor(distance) / 1000}m</h2>
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