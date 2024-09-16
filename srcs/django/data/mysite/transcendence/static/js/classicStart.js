/****************************** MODE SELECTION ******************************/
// Player vs AI
document.getElementById('modeVsAI').addEventListener('click', function () {
	const username = document.getElementById('profileUsername').textContent;
	nbPlayers = 1;

	console.log(`username = '${username}'`);
	if (username.length > 0)
	{
		document.getElementById('player1Label').textContent = username;
		document.getElementById('player2Label').textContent = '42B0T';
		switchScreen('gameScreen');
		console.log(`Launching a classic game vs AI for ${username}`);
	}
	else
	{
		switchScreen('playerNamesScreen');
		console.log('Requesting player name for Player vs AI');
	}
});

// 2 players
document.getElementById('mode2Players').addEventListener('click', function () {
	nbPlayers = 2;
	switchScreen('playerNamesScreen');
	console.log('Requesting player names for 2 players');
});

/******************************** NAMES INPUT *******************************/
// Button 'Start Game' (Start the game with the players input names)
document.getElementById('startGameWithNames').addEventListener('click', function ()
{
	const username = document.getElementById('profileUsername').textContent;
	const player1Name = document.getElementById('player1Input').value.trim();
	let player2Name = document.getElementById('player2Input').value.trim();

	let isValid = true;

	// Reset error messages
	document.getElementById('player1InputError').textContent = '';
	document.getElementById('player2InputError').textContent = '';

	// Validate Player 1 Name
	if (username.length === 0 && player1Name.length < 2)
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
		if (username.length > 0)
			document.getElementById('player1Label').textContent = username;
		else
			document.getElementById('player1Label').textContent = player1Name;
		if (nbPlayers > 1)
			document.getElementById('player2Label').textContent = player2Name;
		else
			document.getElementById('player2Label').textContent = '42B0T';

		switchScreen('gameScreen');
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

	const username = document.getElementById('profileUsername').textContent;

	if (username.length > 0)
	{
		document.getElementById('player1Input').style.display = 'none';
		document.getElementById('player1InputError').style.display = 'none';
		document.getElementById('player1LabelField').style.display = 'none';
	}
	else
	{
		document.getElementById('player1Input').style.display = 'flex';
		document.getElementById('player1InputError').style.display = 'flex';
		document.getElementById('player1LabelField').style.display = 'flex';
	}
}

// Function to display the controls according to the mode
function displayControls()
{
	const controlsDisplay = document.getElementById('controlsDisplay');
	const leftControls = document.getElementById('leftControls');
	const rightControls = document.getElementById('rightControls');

	if (nbPlayers === 1)
	{
		controlsDisplay.classList.remove('normal-mode');
		controlsDisplay.classList.add('ai-mode');
		leftControls.style.display = 'block';
		rightControls.style.display = 'block';
	}
	else
	{
		controlsDisplay.classList.remove('ai-mode');
		controlsDisplay.classList.add('normal-mode');
		leftControls.style.display = 'block';
		rightControls.style.display = 'block';
	}
}
