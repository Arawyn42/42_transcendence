/****************************** MODE SELECTION ******************************/
// Button '1 Player'
document.getElementById('modeVsAI').addEventListener('click', function () {
	// Set 1 player and enable AI
	nbPlayers = 1;
	aiDifficulty = 1;

	// Set the tournament mode OFF
	tournament.running = false;
	
	// If user is connected to his account, set his name
	const username = document.getElementById('profileUsername').textContent;
	if (username.length > 0)
		document.getElementById('player1Label').textContent = username;

	// Set AI name
	document.getElementById('player2Label').textContent = '42B0T';

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
	tournament.running = false;

	// If user is connected to his account, set his name
	const username = document.getElementById('profileUsername').textContent;
	if (username.length > 0)
		document.getElementById('player1Label').textContent = username;

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

	// Switch on Settings Screen
	switchScreen('settingsScreen');
	console.log('Choosing settings for Tournament Mode');
});

// Button 'Back'
document.getElementById('backFromClassicModeSelection').addEventListener('click', function () {
	switchScreen('menuScreen');
	console.log('Returning on Menu from Classic Mode Selection');
});