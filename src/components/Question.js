import React from 'react';
import Option from './Option';
import { generateMarkup } from '../utils';

function Question(props) {
	const { id, options, isShowingResults } = props;
	const optionsElements = options.map((option, index) => {
		return (
			<Option
				key={index}
				{...option}
				isShowingResults={isShowingResults}
				selectOption={() =>
					props.selectAnswerForQuestion(id, option.text)
				}
			/>
		);
	});

	return (
		<div className="question">
			<h2
				className="question-title"
				dangerouslySetInnerHTML={generateMarkup(props.title)}
			></h2>
			<div className="answer-button-container">{optionsElements}</div>
		</div>
	);
}

export default Question;
