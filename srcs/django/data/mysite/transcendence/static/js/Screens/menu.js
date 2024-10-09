/*********************************** MENU ***********************************/
// Button 'Play Classic'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('playClassic').addEventListener('click', function ()
	{
		gameMode = 'classic';
		saveGameMode();
		switchScreen('modeSelectionScreen');
		console.log('Selecting a game mode for classic Pong');
	});
});

// Button 'Play Multiplayer'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('playMultiplayer').addEventListener('click', function ()
	{
		gameMode = 'multi';
		saveGameMode();
		switchScreen('multiModeSelectionScreen');
		console.log('Selecting a game mode for multiplayer Pong');
	});
});

// Button 'profile'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('profile').addEventListener('click', showProfile);
});

// Button 'Chat'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('chat').addEventListener('click', showChat);
});