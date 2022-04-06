import React from 'react';

function Start(props) {
	return (
		<div className="start-container">
			<h1 className="app-title">Quizzical</h1>
			<button className="button" onClick={props.start}>
				Start quiz
			</button>
		</div>
	);
}

export default Start;
