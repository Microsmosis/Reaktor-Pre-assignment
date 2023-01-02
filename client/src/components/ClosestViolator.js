import '../App.css';

export const ClosestViolator = ({violator}) => {
	if(violator){
		return (
			<div className='closest-violator'>
				<h1 className='pilot-info'>The Closest Violator</h1>
				<h2>{violator.firstname} {violator.lastname}</h2>
				<span style={{color: "white"}}>{violator.phone_number}</span>
				<br/>{violator.email}
				<h4>Distance from nest : {Math.floor(violator.distance_to_nest ) / 1000}m</h4>
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