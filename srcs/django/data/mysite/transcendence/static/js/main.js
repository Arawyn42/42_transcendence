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
const MAX_SCORE = 5;

// Number of players
let nbPlayers = 0;

// Mode ('classic' or 'multi')
let gameMode = 'classic';

// AI Difficulty (0 for no AI, 1 for easy, 2 for medium, 3 for hard)
let aiDifficulty = 0;

// Paddles and ball sizes
const BALL_RADIUS = canvas.height * 0.02;
const PADDLE_WIDTH = canvas.height * 0.015;
const PADDLE_HEIGHT = canvas.height * 0.2;

// Ball speed
const BALL_MAX_SPEED = 20;
const BALL_ACCELERATION_X = 1.04;
const BALL_ACCELERATION_Y = 1.02;

// WebSocket for livechat
let chatSocket;


/******************************** FUNCTIONS *********************************/
// Switch to another screen
function switchScreen(screenId)
{
	// Hide all screens
	const screens = document.querySelectorAll('.screen');
	screens.forEach(screen => screen.style.display = 'none');

	// Show the selected screen
	const activeScreen = document.getElementById(screenId);
	if (activeScreen)
	{
		switch (screenId)
		{
			case 'menuScreen':
				const username = document.getElementById('profileUsername').textContent;
				if (username.length < 1)
					document.getElementById('profile').style.display = 'none';
				else
					document.getElementById('profile').style.display = 'flex';
				break;
			case 'gameScreen':
				launchGame();
				break;
			case 'settingsScreen':
				adjustPlayerNamesScreen();
				displayDifficultyButtons();
				break;
			default:
				break;
		}

		activeScreen.style.display = 'flex';
		console.log(`Switching screen to: ${screenId}`);

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
	document.body.classList.remove('hidden'); // Display content only when DOM is loaded

	let hash = window.location.hash.replace('#', '') || 'loginScreen';

	if (hash === 'gameScreen' && (nbPlayers < 1 || nbPlayers > 4))
	{
		console.log("Invalid parameters, redirecting to menuScreen");
		hash = 'menuScreen';
	}

	switchScreen(hash);
});
