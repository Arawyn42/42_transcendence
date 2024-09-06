// Button 'Play Classic'
document.getElementById('playClassic').addEventListener('click', function ()
{
	switchScreen('playerNamesScreen');
	console.log('Requesting players nicknames');
});

// Button 'Play Multiplayer'
document.getElementById('playMultiplayer').addEventListener('click', function ()
{
	switchScreen('gameScreen');
	console.log('Launching a multiplayer pong game');
});