import React from 'react';

function StartPage(props) {
	return (
		<div className="start-container">
			<h1 className="app-title">Quizzical</h1>
			<button className="button" onClick={props.startGame}>
				Start quiz
			</button>
		</div>
	);
}

export default StartPage;
