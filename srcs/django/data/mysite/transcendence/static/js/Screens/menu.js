/*********************************** MENU ***********************************/
// Button 'Play Classic'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('playClassic').addEventListener('click', function ()
	{
		gameMode = 'classic';
		document.getElementById('gameScreen').classList.add('classic-mode');
		switchScreen('modeSelectionScreen');
		console.log('Selecting a game mode for classic Pong');
	});
});

// Button 'Play Multiplayer'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('playMultiplayer').addEventListener('click', function ()
	{
		gameMode = 'multi';
		document.getElementById('gameScreen').classList.remove('classic-mode');
		switchScreen('multiModeSelectionScreen');
		console.log('Selecting a game mode for multiplayer Pong');
	});
});

// Button 'Play Remote'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('playRemote').addEventListener('click', function ()
	{
		gameMode = 'classic';
		aiDifficulty = 1;
		switchScreen('gameScreen');
		console.log('Launching a game in remote');
	});
});

// Button 'profile'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('profile').addEventListener('click', showProfile);
});

