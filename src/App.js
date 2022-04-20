import { useState } from 'react';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';

function App() {
	const [isPlaying, setIsPlaying] = useState(false);

	const startGame = () => {
		setIsPlaying(true);
	};

	return isPlaying ? <QuizPage /> : <StartPage startGame={startGame} />;
}

export default App;
