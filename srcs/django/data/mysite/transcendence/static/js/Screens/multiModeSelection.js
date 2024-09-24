/****************************** MODE SELECTION ******************************/
// Button '1 Player'
document.getElementById('onePlayerMode').addEventListener('click', function () {
	// Set 1 player and enable AI
	nbPlayers = 1;
	aiDifficulty = 1;
	
	// If user is connected to his account, set his name
	const username = document.getElementById('profileUsername').textContent;
	if (username.length > 0)
		document.getElementById('player1Label').textContent = username;

	// Set AI names
	document.getElementById('player2Label').textContent = '42B0T';
	document.getElementById('player3Label').textContent = 'R2D2';
	document.getElementById('player4Label').textContent = 'T33MO';

	// Switch on Settings Screen
	switchScreen('settingsScreen');
	console.log(`Choosing settings for 1 Player Mode - Multiplayer`);
});

// Button '2 Players'
document.getElementById('twoPlayersMode').addEventListener('click', function () {
	// Set 2 players and enable AI
	nbPlayers = 2;
	aiDifficulty = 1;

	// If user is connected to his account, set his name
	const username = document.getElementById('profileUsername').textContent;
	if (username.length > 0)
		document.getElementById('player1Label').textContent = username;

	// Set AI names
	document.getElementById('player3Label').textContent = 'R2D2';
	document.getElementById('player4Label').textContent = 'T33MO';

	// Switch on Settings Screen
	switchScreen('settingsScreen');
	console.log(`Choosing settings for 2 Players Mode - Multiplayer`);
});

// Button '3 Players'
document.getElementById('threePlayersMode').addEventListener('click', function () {
	// Set 3 players and enable AI
	nbPlayers = 3;
	aiDifficulty = 1;

	// If user is connected to his account, set his name
	const username = document.getElementById('profileUsername').textContent;
	if (username.length > 0)
		document.getElementById('player1Label').textContent = username;

	// Set AI name
	document.getElementById('player4Label').textContent = 'T33MO';

	// Switch on Settings Screen
	switchScreen('settingsScreen');
	console.log(`Choosing settings for 3 Players Mode - Multiplayer`);
});

// Button '4 Players'
document.getElementById('fourPlayersMode').addEventListener('click', function () {
	// Set 4 players and no AI
	nbPlayers = 4;
	aiDifficulty = 0;

	// If user is connected to his account, set his name
	const username = document.getElementById('profileUsername').textContent;
	if (username.length > 0)
		document.getElementById('player1Label').textContent = username;

	// Switch on Settings Screen
	switchScreen('settingsScreen');
	console.log(`Choosing settings for 4 Players Mode - Multiplayer`);
});

// Button 'Back'
document.getElementById('backFromMultiModeSelection').addEventListener('click', function () {
	switchScreen('menuScreen');
	console.log('Returning on Menu from Multiplayer Mode Selection');
});