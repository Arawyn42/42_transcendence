/******************************** CONSTANTES ********************************/
// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Colors
const WHITE = '#fff';
const BLACK = '#000';
const GREEN = '#00FF00';
const RED = '#FF0000';

// Username
let USERNAME = null;

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
const BALL_MAX_SPEED = 12;
const BALL_ACCELERATION_X = 1.04;
const BALL_ACCELERATION_Y = 1.02;

// Tournament
let tournament = {
	running: false,
	playedGames: 0,
	opponent1: '',
	opponent2: '',

	player1: '',
	player1Score: 0,

	player2: '',
	player2Score: 0,

	player3: '',
	player3Score: 0,

	player4: '',
	player4Score: 0
}

// CSRF Token
let csrfToken = getCookie('csrftoken');

// WebSocket for livechat
let chatSocket;


/******************************** FUNCTIONS *********************************/
// Update USERNAME then switch to specified screen
function switchScreen(screenId)
{
	updateUsername().then(() => {
		switchToScreen(screenId);
	}).catch(error => {
		switchToScreen(screenId);
	});
}

// Switch to another screen
function switchToScreen(screenId)
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
			case 'loginScreen':
				document.getElementById('loginForm').reset();
				resetTournament();
				break;
			case '2faScreen':
				document.getElementById('twoFaForm').reset();
				break;
			case 'registerScreen':
				document.getElementById('registerForm').reset();
				break;
			case 'friendScreen':
				updateFriendsList();
				break;
			case 'menuScreen':
				displayMenuButtons();
				resetTournament();
				break;
			case 'modeSelectionScreen':
				resetTournament();
				break;
			case 'multiModeSelectionScreen':
				resetTournament();
				break;
			case 'gameScreen':
				launchGame();
				break;
			case 'settingsScreen':
				resetSettingsInputs();
				adjustPlayerNamesScreen();
				displayDifficultyButtons();
				break;
			case 'tournamentScreen':
				if (!setUpTournament())
				{
					resetTournament();
					switchScreen('menuScreen');
					return;
				}
				break;
			case 'endScreen':
				updateEndScreen();
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
	if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
		chatSocket.close();
	}
	if (event.state && event.state.screenId)
	{
		switchScreen(event.state.screenId);
		if (event.state.screenId === 'loginScreen')
			setTimeout(() => {
				location.reload();
			}, 100);
	}
	else
	{
		if (USERNAME)
			switchToScreen('menuScreen');
		else
		{
			switchToScreen('loginScreen');
			setTimeout(() => {
				location.reload();
			}, 100);
		}
	}

	if (currentGameInstance)
	{
		console.log('Ending previous game instance...')
		endGame(currentGameInstance);
	}

});

// Update CSRF Token
function updateCsrfToken()
{
	csrfToken = getCookie('csrftoken');
}

// Update USERNAME and csrfToken
async function updateUsername() {
	try {
		updateCsrfToken();
		USERNAME = await getUsername();
		console.log(`USERNAME updated: '${USERNAME}'`);
	} catch (error) {
		console.error('Error updating USERNAME: ', error);
		USERNAME = null;
	}
}

// Return the username if connected, or null if not or in case of error
async function getUsername() {
	try
	{
		const accessToken = localStorage.getItem('access_token');
		if (!accessToken)
		{
			console.log(`Cannot get username: No access token stored`);
			return (null);
		}

		const response = await fetch('/profile/', {
			method: 'GET',
			headers: {
				'X-CSRFToken': csrfToken,
				'Authorization': 'Bearer ' + localStorage.getItem('access_token')
			},
		});

		if (response.ok)
		{
			const data = await response.json();
			return (data.username || null);
		}
		else if (response.status === 401)
		{
			console.log('Cannot get username: User token expired. Logging out...');
			logout();
			alert('Your session has expired. Please log in again.');
			return null;
		}
		else
			console.log(`Cannot get username: Unknown error`);
			return (null);
	}
	catch(error)
	{
		console.error('Error getting username: ', error);
		return (null);
	}
}


/****************************** LAUNCH SCRIPTS ******************************/
// Launch when window loads for the first time or when reloaded
document.addEventListener('DOMContentLoaded', function ()
{
	// Display content only when DOM is loaded
	document.body.classList.remove('hidden');

	// Load datas from cookies
	loadDatas();
	
	// Switch to current screen (or loginScreen if no current screen)
	let hash = window.location.hash.replace('#', '');
	if (hash) {
		switchScreen(hash);
	} else {
		if (USERNAME) {
			switchScreen('menuScreen');
		} else {
			switchScreen('loginScreen');
		}
	}

});
