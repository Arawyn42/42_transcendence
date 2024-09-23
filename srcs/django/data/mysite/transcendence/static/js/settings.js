/******************************* PLAYER NAMES *******************************/
// Function to display the good number of fields according to the number of players
function adjustPlayerNamesScreen()
{
	const username = document.getElementById('profileUsername').textContent;

	// Hide Player 1 Input field if the user is connected to his account
	if (username.length > 0)
	{
		document.getElementById('player1LabelField').style.display = 'none';
		document.getElementById('player1InputError').style.display = 'none';
	}
	else
	{
		document.getElementById('player1LabelField').style.display = 'flex';
		document.getElementById('player1InputError').style.display = 'flex';
	}

	// Display players fields according to the number of players
	if (nbPlayers === 1)		// 1 Player
	{
		document.getElementById('player2LabelField').style.display = 'none';
		document.getElementById('player2InputError').style.display = 'none';
		document.getElementById('player3LabelField').style.display = 'none';
		document.getElementById('player3InputError').style.display = 'none';
		document.getElementById('player4LabelField').style.display = 'none';
		document.getElementById('player4InputError').style.display = 'none';
	}
	else if (nbPlayers === 2)	// 2 Players
	{
		document.getElementById('player2LabelField').style.display = 'flex';
		document.getElementById('player2InputError').style.display = 'flex';
		document.getElementById('player3LabelField').style.display = 'none';
		document.getElementById('player3InputError').style.display = 'none';
		document.getElementById('player4LabelField').style.display = 'none';
		document.getElementById('player4InputError').style.display = 'none';
	}
	else if (nbPlayers === 3)	// 3 Players
	{
		document.getElementById('player2LabelField').style.display = 'flex';
		document.getElementById('player2InputError').style.display = 'flex';
		document.getElementById('player3LabelField').style.display = 'flex';
		document.getElementById('player3InputError').style.display = 'flex';
		document.getElementById('player4LabelField').style.display = 'none';
		document.getElementById('player4InputError').style.display = 'none';
	}
	else						// 4 Players
	{
		document.getElementById('player2LabelField').style.display = 'flex';
		document.getElementById('player2InputError').style.display = 'flex';
		document.getElementById('player3LabelField').style.display = 'flex';
		document.getElementById('player3InputError').style.display = 'flex';
		document.getElementById('player4LabelField').style.display = 'flex';
		document.getElementById('player4InputError').style.display = 'flex';
	}

	// If user is connected to his account and there is no more players,
	// hide the players names section
	if (aiDifficulty > 0 && username.length > 0 && nbPlayers === 1)
		document.getElementById('enterYourNames').style.display = 'none';
	else
		document.getElementById('enterYourNames').style.display = 'flex';
}


/****************************** AI DIFFICULTY *******************************/
// Function to display the difficulty buttons only in player vs AI mode
function displayDifficultyButtons()
{
	if (aiDifficulty > 0)
		document.getElementById('difficultySelection').style.display = 'flex';
	else
		document.getElementById('difficultySelection').style.display = 'none';
}

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

// Function to update the selected AI difficulty button
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


/******************************* START GAME *********************************/
// Button 'Start Game' (Start the game with the players input names)
document.getElementById('startGameWithParameters').addEventListener('click', function ()
{
	const username = document.getElementById('profileUsername').textContent;
	let player1Name = document.getElementById('player1Input').value.trim();
	const player2Name = document.getElementById('player2Input').value.trim();
	const player3Name = document.getElementById('player3Input').value.trim();
	const player4Name = document.getElementById('player4Input').value.trim();
	let isValid = true;

	// Reset error messages
	document.getElementById('player1InputError').textContent = '';
	document.getElementById('player2InputError').textContent = '';
	document.getElementById('player3InputError').textContent = '';
	document.getElementById('player4InputError').textContent = '';

	// Check Player 1 Name
	if (username.length === 0 && player1Name.length < 2)
	{
		document.getElementById('player1InputError').textContent = 'Enter at least 2 characters';
		isValid = false;
	}

	// Check Player 2 Name
	if (nbPlayers >= 2 && player2Name.length < 2)
	{
		document.getElementById('player2InputError').textContent = 'Enter at least 2 characters';
		isValid = false;
	}

	// Check Player 3 Name
	if (nbPlayers >= 3 && player3Name.length < 2)
	{
		document.getElementById('player3InputError').textContent = 'Enter at least 2 characters';
		isValid = false;
	}

	// Check Player 4 Name
	if (nbPlayers === 4 && player4Name.length < 2)
	{
		document.getElementById('player4InputError').textContent = 'Enter at least 2 characters';
		isValid = false;
	}

	// If names are valid, start the game
	if (isValid)
	{
		if (username.length > 0)
			player1Name = username;
		document.getElementById('player1Label').textContent = player1Name;
		if (nbPlayers >= 2)
			document.getElementById('player2Label').textContent = player2Name;
		if (nbPlayers >= 3)
			document.getElementById('player3Label').textContent = player3Name;
		if (nbPlayers === 4)
			document.getElementById('player4Label').textContent = player4Name;

		switchScreen('gameScreen');

		// Display a log message in the console
		if (nbPlayers === 1 && gameMode === 'classic')
			console.log(`Starting a classic game with 1 player: '${player1Name}'`);
		else if (nbPlayers === 2 && gameMode === 'classic')
			console.log(`Starting a classic game with 2 players: '${player1Name}', '${player2Name}'`);
		else if (nbPlayers === 1 && gameMode === 'multi')
			console.log(`Starting a multiplayer game with 1 player: '${player1Name}'`);
		else if (nbPlayers === 2 && gameMode === 'multi')
			console.log(`Starting a multiplayer game with 2 players: '${player1Name}', '${player2Name}'`);
		else if (nbPlayers === 3)
			console.log(`Starting a multiplayer game with 3 players: '${player1Name}', '${player2Name}', '${player3Name}'`);
		else if (nbPlayers === 4)
			console.log(`Starting a multiplayer game with 4 players: '${player1Name}', '${player2Name}', '${player3Name}', '${player4Name}'`);
		else
			console.error(`Starting a game but can't find the mode...`);
	}
});

// Button 'Back'
document.getElementById('backFromSettings').addEventListener('click', function () {
	if (gameMode === 'classic')
	{
		switchScreen('modeSelectionScreen');
		console.log('Returning on Mode Selection from Classic Settings');
	}
	else if (gameMode === 'multi')
	{
		switchScreen('multiModeSelectionScreen');
		console.log('Returning on Mode Selection from Multiplayers Settings');
	}
	else
		console.error(`Can't detect the game mode (from 'Back' button at Settings)`);
});

