import React from 'react';
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';

function App() {
	const [isPlaying, setIsPlaying] = React.useState(false);

	function start() {
		setIsPlaying(true);
	}

	return isPlaying ? <QuizScreen /> : <StartScreen start={start} />;
}

export default App;
