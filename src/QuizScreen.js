import React from 'react';
import Question from './Question';

function QuizScreen() {
	const [questions, setQuestions] = React.useState([]);
	const [isShowingResults, setIsShowingResults] = React.useState(false);

	React.useEffect(() => {
		fetchQuestions();
	}, []);

	async function fetchQuestions() {
		const res = await fetch(
			'https://opentdb.com/api.php?amount=5&difficulty=medium'
		);
		const json = await res.json();

		const questionItems = json.results.map((item, index) => {
			const { question, correct_answer, incorrect_answers } = item;
			const allAnswers = shuffle([correct_answer, ...incorrect_answers]);

			return {
				id: index, // TODO generate id for question
				title: question,
				allAnswers,
				correctAnswer: correct_answer,
				playerAnswer: null,
			};
		});

		setQuestions(questionItems);
	}

	function shuffle(array) {
		return array.sort(() => Math.random() - 0.5);
	}

	function selectAnswerForQuestion(questionId, answer) {
		setQuestions(oldQuestions => {
			return oldQuestions.map(question => {
				return question.id === questionId
					? { ...question, playerAnswer: answer }
					: question;
			});
		});
	}

	function checkAnswers() {
		setIsShowingResults(true);
	}

	function restart() {
		setQuestions([]);
		setIsShowingResults(false);
		fetchQuestions();
	}

	const questionElements = questions.map((question, index) => {
		return (
			<Question
				key={index}
				{...question}
				selectAnswerForQuestion={selectAnswerForQuestion}
				isShowingResults={isShowingResults}
			/>
		);
	});

	const correctlyAnsweredQuestions = questions.filter(
		question => question.playerAnswer === question.correctAnswer
	);

	const isLoading = questions.length === 0;

	return (
		<div className="quiz-container">
			<div className="questions-container">{questionElements}</div>
			<div className="results">
				{isLoading && <p>Loading...</p>}
				{!isLoading && !isShowingResults && (
					<button className="button" onClick={checkAnswers}>
						Check answers
					</button>
				)}
				{isShowingResults && (
					<p className="results-text">
						You scored {correctlyAnsweredQuestions.length}/
						{questions.length} correct answers
					</p>
				)}

				{isShowingResults && (
					<button className="button" onClick={restart}>
						Play again
					</button>
				)}
			</div>
		</div>
	);
}

export default QuizScreen;
