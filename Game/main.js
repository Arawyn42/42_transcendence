/******************************** CONSTANTES ********************************/
// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Colors
const WHITE = '#fff';
const BLACK = '#000';
const GREEN = '#00FF00';
const RED = '#FF0000';

// Scores
const MAX_SCORE = 5;

// Number of players
let nbPlayers = 2;

// Paddles and ball sizes
const BALL_RADIUS = canvas.height * 0.02;
const PADDLE_WIDTH = canvas.height * 0.015;
const PADDLE_HEIGHT = canvas.height * 0.2;


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
});

/****************************** LAUNCH SCRIPTS ******************************/
// Display the menu on start
document.addEventListener('DOMContentLoaded', function ()
{
	const hash = window.location.hash.replace('#', '') || 'menuScreen';
	switchScreen(hash);
});
