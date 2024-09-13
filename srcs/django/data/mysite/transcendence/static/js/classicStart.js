/****************************** MODE SELECTION ******************************/
// Player vs AI
document.getElementById('modeVsAI').addEventListener('click', function () {
	nbPlayers = 1;
	adjustPlayerNamesScreen();
	switchScreen('playerNamesScreen');
	console.log('Requesting player name for Player vs AI');
});

// 2 players
document.getElementById('mode2Players').addEventListener('click', function () {
	nbPlayers = 2;
	adjustPlayerNamesScreen();
	switchScreen('playerNamesScreen');
	console.log('Requesting player names for 2 players');
});

/******************************** NAMES INPUT *******************************/
// Button 'Start Game' (Start the game with the players input names)
document.getElementById('startGameWithNames').addEventListener('click', function ()
{
	const player1Name = document.getElementById('player1Input').value.trim();
	let player2Name = document.getElementById('player2Input').value.trim();

	let isValid = true;

	// Reset error messages
	document.getElementById('player1InputError').textContent = '';
	document.getElementById('player2InputError').textContent = '';

	// Validate Player 1 Name
	if (player1Name.length < 2)
	{
		document.getElementById('player1InputError').textContent = 'Enter at least 2 characters';
		isValid = false;
	}

	if (nbPlayers > 1)
	{
		player2Name = document.getElementById('player2Input').value.trim();

		// Validate Player 2 Name
		if (player2Name.length < 2)
		{
			document.getElementById('player2InputError').textContent = 'Enter at least 2 characters';
			isValid = false;
		}
	}

	// If names are valid, start the game
	if (isValid)
	{
		document.getElementById('player1Label').textContent = player1Name;
		if (nbPlayers > 1)
			document.getElementById('player2Label').textContent = player2Name;
		else
			document.getElementById('player2Label').textContent = '42B0T';

		displayControls();
		switchScreen('gameScreen');
		classicPongGame();
		console.log(`Starting the game with player names: ${player1Name}, ${player2Name}`);
	}
});

// Function to display the good number of fields according to the number of players
function adjustPlayerNamesScreen()
{
	if (nbPlayers === 1)
	{
		document.getElementById('player2Input').style.display = 'none';
		document.getElementById('player2InputError').style.display = 'none';
		document.getElementById('player2LabelField').style.display = 'none';
	}
	else
	{
		document.getElementById('player2Input').style.display = 'flex';
		document.getElementById('player2InputError').style.display = 'flex';
		document.getElementById('player2LabelField').style.display = 'flex';
	}
}

// Function to display the controls according to the mode
function displayControls()
{
	const controlsDisplay = document.getElementById('controlsDisplay');
	const leftControls = document.getElementById('leftControls');
	const rightControls = document.getElementById('rightControls');

	if (nbPlayers === 1) {
		// Mode IA : activer les deux ensembles de touches sur la gauche
		controlsDisplay.classList.remove('normal-mode');
		controlsDisplay.classList.add('ai-mode');
		leftControls.style.display = 'block';
		rightControls.style.display = 'block';  // Montre les touches flèche à gauche
	} else {
		// Mode 2 joueurs : une touche à gauche, l'autre à droite
		controlsDisplay.classList.remove('ai-mode');
		controlsDisplay.classList.add('normal-mode');
		leftControls.style.display = 'block';
		rightControls.style.display = 'block';  // Montre les touches flèche à droite
	}
}
