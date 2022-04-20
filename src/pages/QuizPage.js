import { useState, useEffect } from 'react';
import Question from '../components/Question';

const API_URL = 'https://opentdb.com/api.php?amount=5&difficulty=medium';

function QuizPage() {
	const [questions, setQuestions] = useState([]);
	const [isShowingResults, setIsShowingResults] = useState(false);

	useEffect(() => {
		fetchQuestions();
	}, []);

	async function fetchQuestions() {
		const res = await fetch(API_URL);
		const json = await res.json();
		console.log(json);

		const questionItems = json.results.map((item, index) => {
			const { question, correct_answer, incorrect_answers } = item;
			const options = [correct_answer, ...incorrect_answers].map(
				answer => {
					return {
						text: answer,
						isCorrect: answer === correct_answer,
						isSelected: false,
					};
				}
			);
			const shuffledOptions = shuffleOptions(options);

			return {
				id: index, // TODO generate id for question
				title: question,
				options: shuffledOptions,
			};
		});

		setQuestions(questionItems);
	}

	function shuffleOptions(options) {
		return options.sort(() => Math.random() - 0.5);
	}

	function selectAnswerForQuestion(questionId, answer) {
		setQuestions(oldQuestions => {
			return oldQuestions.map(question => {
				if (question.id !== questionId) {
					return question;
				}

				const newOptions = question.options.map(option => {
					return { ...option, isSelected: option.text === answer };
				});

				return { ...question, options: newOptions };
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

	const correctlyAnsweredQuestions = questions.filter(question => {
		return question.options.some(
			option => option.isCorrect && option.isSelected
		);
	});

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

export default QuizPage;
