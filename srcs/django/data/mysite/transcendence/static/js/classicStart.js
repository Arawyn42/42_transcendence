/****************************** MODE SELECTION ******************************/
// Player vs AI Button
document.getElementById('modeVsAI').addEventListener('click', function () {
	const username = document.getElementById('profileUsername').textContent;
	nbPlayers = 1;

	console.log(`username = '${username}'`);
	if (username.length > 0)
	{
		document.getElementById('player1Label').textContent = username;
		document.getElementById('player2Label').textContent = '42B0T';
		switchScreen('parametersScreen');
		console.log(`Selecting AI difficulty for user '${username}'`);
	}
	else
	{
		switchScreen('parametersScreen');
		console.log('Requesting player name for Player vs AI');
	}
});

// 2 players Button
document.getElementById('mode2Players').addEventListener('click', function () {
	nbPlayers = 2;
	switchScreen('parametersScreen');
	console.log('Requesting player names for 2 players');
});


/******************************** PARAMETERS ********************************/
// Button 'Easy' (Difficulty selection for AI)
document.getElementById('easyButton').addEventListener('click', function () {
    aiDifficulty = 1;
    updateDifficultySelection(document.getElementById('easyButton'));
});

// Button 'Easy' (Difficulty selection for AI)
document.getElementById('mediumButton').addEventListener('click', function () {
    aiDifficulty = 2;
    updateDifficultySelection(document.getElementById('mediumButton'));
});

// Button 'Easy' (Difficulty selection for AI)
document.getElementById('hardButton').addEventListener('click', function () {
    aiDifficulty = 3;
    updateDifficultySelection(document.getElementById('hardButton'));
});

// Function to update the selected difficulty button
function updateDifficultySelection(selectedButton)
{
	const easyButton = document.getElementById('easyButton');
	const mediumButton = document.getElementById('mediumButton');
	const hardButton = document.getElementById('hardButton');
    const buttons = [easyButton, mediumButton, hardButton];

    buttons.forEach(button => {
        if (button === selectedButton)
            button.classList.add('selected');
        else
            button.classList.remove('selected');
    });
}

// Button 'Start Game' (Start the game with the players input names)
document.getElementById('startGameWithParameters').addEventListener('click', function ()
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

	if (nbPlayers === 1 && username.length > 0)
		document.getElementById('enterYourNames').style.display = 'none';
	else
		document.getElementById('enterYourNames').style.display = 'flex';
}

// Function to display the difficulty buttons only in player vs AI mode
function displayDifficultyButtons()
{
	if (nbPlayers === 1)
	{
		document.getElementById('difficultySelection').style.display = 'flex';
	}
	else
	{
		document.getElementById('difficultySelection').style.display = 'none';
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
