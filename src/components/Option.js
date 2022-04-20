import React from 'react';
import { generateMarkup } from '../utils';

function Option(props) {
	console.log(props);
	const { text, isCorrect, isSelected, isShowingResults } = props;

	let cssClass = 'answer-button';

	if (isShowingResults) {
		if (isSelected && isCorrect) {
			cssClass += ' answer-button--correct';
		} else if (isSelected && !isCorrect) {
			cssClass += ' answer-button--incorrect';
		}
	} else if (isSelected) {
		cssClass += ' answer-button--selected';
	}

	return (
		<button
			className={cssClass}
			dangerouslySetInnerHTML={generateMarkup(text)}
			onClick={props.selectOption}
			disabled={props.isShowingResults}
		></button>
	);
}

export default Option;
