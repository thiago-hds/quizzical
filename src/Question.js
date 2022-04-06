import React from 'react';
import Answer from './Answer';
import { generateMarkup } from './utils';

function Question(props) {
	const answerElements = props.allAnswers.map((answer, index) => {
		return (
			<Answer
				key={index}
				correctAnswer={props.correctAnswer}
				playerAnswer={props.playerAnswer}
				answer={answer}
				isShowingResults={props.isShowingResults}
				select={() => props.selectAnswerForQuestion(props.id, answer)}
			/>
		);
	});

	return (
		<div className="question">
			<h2
				className="question-title"
				dangerouslySetInnerHTML={generateMarkup(props.title)}
			></h2>
			<div className="answer-button-container">{answerElements}</div>
		</div>
	);
}

export default Question;
