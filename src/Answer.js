import React from 'react';
import { generateMarkup } from './utils';

function Answer(props) {
	const { answer, playerAnswer, correctAnswer, isShowingResults } = props;

	let cssClass = 'answer-button';

	if (isShowingResults) {
		if (answer === correctAnswer) {
			cssClass += ' answer-button--correct';
		} else if (answer === playerAnswer && answer !== correctAnswer) {
			cssClass += ' answer-button--incorrect';
		}
	} else if (answer === playerAnswer) {
		cssClass += ' answer-button--selected';
	}

	return (
		<button
			className={cssClass}
			dangerouslySetInnerHTML={generateMarkup(props.answer)}
			onClick={props.select}
			disabled={props.isShowingResults}
		></button>
	);
}

export default Answer;
