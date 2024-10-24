/******************************* PLAYER NAMES *******************************/
// Function to display the good number of fields according to the number of players
function adjustPlayerNamesScreen()
{
	// Hide Player 1 Input field if the user is connected to his account
	if (USERNAME)
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
	if (nbPlayers === 1)										// 1 Player
	{
		document.getElementById('player2LabelField').style.display = 'none';
		document.getElementById('player2InputError').style.display = 'none';
		document.getElementById('player3LabelField').style.display = 'none';
		document.getElementById('player3InputError').style.display = 'none';
		document.getElementById('player4LabelField').style.display = 'none';
		document.getElementById('player4InputError').style.display = 'none';
	}
	else if (nbPlayers === 2 && !tournament.running)			// 2 Players
	{
		document.getElementById('player2LabelField').style.display = 'flex';
		document.getElementById('player2InputError').style.display = 'flex';
		document.getElementById('player3LabelField').style.display = 'none';
		document.getElementById('player3InputError').style.display = 'none';
		document.getElementById('player4LabelField').style.display = 'none';
		document.getElementById('player4InputError').style.display = 'none';
	}
	else if (nbPlayers === 3)									// 3 Players
	{
		document.getElementById('player2LabelField').style.display = 'flex';
		document.getElementById('player2InputError').style.display = 'flex';
		document.getElementById('player3LabelField').style.display = 'flex';
		document.getElementById('player3InputError').style.display = 'flex';
		document.getElementById('player4LabelField').style.display = 'none';
		document.getElementById('player4InputError').style.display = 'none';
	}
	else if (nbPlayers === 4 || tournament.running)				// 4 Players
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
	if (aiDifficulty > 0 && USERNAME && nbPlayers === 1)
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

	if (USERNAME)
		player1Name = USERNAME;

	// Check Player 1 Name
	if (USERNAME === null && player1Name.length < 2)
	{
		document.getElementById('player1InputError').textContent = 'Enter at least 2 characters';
		isValid = false;
	}

	// Check Player 2 Name
	if (nbPlayers >= 2 && (player2Name.length < 2 || player2Name === player1Name))
	{
		if (player2Name.length < 2)
			document.getElementById('player2InputError').textContent = 'Enter at least 2 characters';
		else
			document.getElementById('player2InputError').textContent = 'Enter a different name';
		isValid = false;
	}

	// Check Player 3 Name
	if ((tournament.running || nbPlayers >= 3)
		&& (player3Name.length < 2 || player3Name === player1Name
		|| player3Name === player2Name))
	{
		if (player3Name.length < 2)
			document.getElementById('player3InputError').textContent = 'Enter at least 2 characters';
		else
			document.getElementById('player3InputError').textContent = 'Enter a different name';
		isValid = false;
	}

	// Check Player 4 Name
	if ((tournament.running || nbPlayers === 4)
		&& (player4Name.length < 2 || player4Name === player1Name
		|| player4Name === player2Name || player4Name === player3Name))
	{
		if (player4Name.length < 2)
			document.getElementById('player4InputError').textContent = 'Enter at least 2 characters';
		else
			document.getElementById('player4InputError').textContent = 'Enter a different name';
		isValid = false;
	}

	// If names are valid, start the game
	if (isValid)
	{
		// If in tournament mode, call the Setup function and return
		if (tournament.running)
		{
			tournament.player1 = player1Name;
			tournament.player2 = player2Name;
			tournament.player3 = player3Name;
			tournament.player4 = player4Name;
			saveTournament();
			switchScreen('tournamentScreen');
			return;
		}

		// Replace players names
		document.getElementById('player1Label').textContent = player1Name;
		if (nbPlayers >= 2)
			document.getElementById('player2Label').textContent = player2Name;
		if (nbPlayers >= 3)
			document.getElementById('player3Label').textContent = player3Name;
		if (nbPlayers === 4)
			document.getElementById('player4Label').textContent = player4Name;

		// Save settings in cookies
		savePlayer(1);
		savePlayer(2);
		savePlayer(3);
		savePlayer(4);
		saveAiDifficulty();

		// Launch the game with current settings
		switchScreen('gameScreen');

		// Display a log message in the console
		if (nbPlayers === 1 && gameMode === 'classic')
			console.log(`Starting a classic game with 1 player: '${player1Name}'`);
		else if (nbPlayers === 2 && gameMode === 'classic' && !tournament.running)
			console.log(`Starting a classic game with 2 players: '${player1Name}', '${player2Name}'`);
		else if (nbPlayers === 1 && gameMode === 'multi')
			console.log(`Starting a multiplayer game with 1 player: '${player1Name}'`);
		else if (nbPlayers === 2 && gameMode === 'multi' && !tournament.running)
			console.log(`Starting a multiplayer game with 2 players: '${player1Name}', '${player2Name}'`);
		else if (nbPlayers === 3)
			console.log(`Starting a multiplayer game with 3 players: '${player1Name}', '${player2Name}', '${player3Name}'`);
		else if (nbPlayers === 4)
			console.log(`Starting a multiplayer game with 4 players: '${player1Name}', '${player2Name}', '${player3Name}', '${player4Name}'`);
		else if (tournament.running && nbPlayers === 2)
			console.log(`Starting a tournament with 4 players: '${player1Name}', '${player2Name}', '${player3Name}', '${player4Name}'`);
		else
			console.error(`Starting a game with wrong number of players...`);
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

// Reset input texts
function resetSettingsInputs()
{
	document.getElementById('player1Input').value = '';
	document.getElementById('player1InputError').textContent = '';
	document.getElementById('player2Input').value = '';
	document.getElementById('player2InputError').textContent = '';
	document.getElementById('player3Input').value = '';
	document.getElementById('player3InputError').textContent = '';
	document.getElementById('player4Input').value = '';
	document.getElementById('player4InputError').textContent = '';
}