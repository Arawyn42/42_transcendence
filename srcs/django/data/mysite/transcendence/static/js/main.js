/******************************** CONSTANTES ********************************/
// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Colors
const WHITE = '#fff';
const BLACK = '#000';
const GREEN = '#00FF00';
const RED = '#FF0000';

// Game instance
let currentGameInstance = null;

// Scores
const MAX_SCORE = 1;

// Number of players
let nbPlayers = 2;

// AI Difficulty
let aiDifficulty = 1;

// Paddles and ball sizes
const BALL_RADIUS = canvas.height * 0.02;
const PADDLE_WIDTH = canvas.height * 0.015;
const PADDLE_HEIGHT = canvas.height * 0.2;

// WebSocket for livechat
let chatSocket;


/******************************** FUNCTIONS *********************************/
// Switch to another screen
function switchScreen(screenId)
{
	// Hide all screens
	const screens = document.querySelectorAll('.screen');
	screens.forEach(screen =>
	{
		screen.style.display = 'none';
	});

	// Show the selected screen
	const activeScreen = document.getElementById(screenId);
	if (activeScreen)
	{
		switch (screenId)
		{
			case 'gameScreen':
				displayControls();
				classicPongGame();
				break;
			case 'parametersScreen':
				adjustPlayerNamesScreen();
				displayDifficultyButtons();
				break;
			default:
				break;
		}

		activeScreen.style.display = 'flex';

		const currentState = window.history.state;
		if (!currentState || currentState.screenId !== screenId)
			window.history.pushState({ screenId }, '', `#${screenId}`);
	}
	else
		console.error(`Screen with ID ${screenId} not found`);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) =>
{
	if (event.state && event.state.screenId)
		switchScreen(event.state.screenId);
	else
		switchScreen('menuScreen');

	if (currentGameInstance)
	{
		console.log('Ending previous game instance...')
		endGame(currentGameInstance);
	}
});

/****************************** LAUNCH SCRIPTS ******************************/
// Display the menu on start
document.addEventListener('DOMContentLoaded', function ()
{
	const hash = window.location.hash.replace('#', '') || 'loginScreen';
	switchScreen(hash);
});
