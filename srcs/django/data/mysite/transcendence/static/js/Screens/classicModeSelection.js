/****************************** MODE SELECTION ******************************/
// Button '1 Player'
document.getElementById('modeVsAI').addEventListener('click', function () {
	// Set 1 player and enable AI
	nbPlayers = 1;
	aiDifficulty = 1;

	// Set the tournament mode OFF
	resetTournament();
	
	// If user is connected to his account, set his name
	if (USERNAME)
		document.getElementById('player1Label').textContent = USERNAME;
	
	// Set AI name
	document.getElementById('player2Label').textContent = '42B0T';

	// Save the values in cookies
	saveNbPlayers();
	saveAiDifficulty();
	if (USERNAME)
		savePlayer(1);
	savePlayer(2);
	
	// Switch on Settings Screen
	switchScreen('settingsScreen');

	console.log(`Choosing settings for 1 Player Mode - Classic`);
});

// Button '2 Players'
document.getElementById('mode2Players').addEventListener('click', function () {
	// Set 2 players and no AI
	nbPlayers = 2;
	aiDifficulty = 0;

	// Set the tournament mode OFF
	resetTournament();

	// If user is connected to his account, set his name
	if (USERNAME)
		document.getElementById('player1Label').textContent = USERNAME;

	// Save the values in cookies
	saveNbPlayers();
	saveAiDifficulty();
	if (USERNAME)
		savePlayer(1);

	// Switch on Settings Screen
	switchScreen('settingsScreen');
	console.log('Choosing settings for 2 Players Mode - Classic');
});

// Button 'Tournament'
document.getElementById('modeTournament').addEventListener('click', function () {
	// Set 2 players and no AI
	nbPlayers = 2;
	aiDifficulty = 0;

	// Set the tournament mode ON
	tournament.running = true;

	// Save the values in cookies
	saveNbPlayers();
	saveAiDifficulty();
	saveTournament();

	// Switch on Settings Screen
	switchScreen('settingsScreen');
	console.log('Choosing settings for Tournament Mode');
});

// Button 'Back'
document.getElementById('backFromClassicModeSelection').addEventListener('click', function () {
	switchScreen('menuScreen');
	console.log('Returning on Menu from Classic Mode Selection');
});