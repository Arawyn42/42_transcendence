/*********************************** MENU ***********************************/
// Button 'Play Classic'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('playClassic').addEventListener('click', function ()
	{
		switchScreen('modeSelectionScreen');
		console.log('Selecting a game mode');
	});
});

// Button 'Play Multiplayer'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('playMultiplayer').addEventListener('click', function ()
	{
		switchScreen('gameScreen');
		console.log('Launching a multiplayer pong game');
	});
});

// Button 'Play Remote'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('playRemote').addEventListener('click', function ()
	{
		nbPlayers = 1;
		switchScreen('gameScreen');
		classicPongGame();
		console.log('Launching a game in remote');
	});
});

// Button 'profile'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('profile').addEventListener('click', showProfile);
});

