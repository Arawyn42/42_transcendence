// Button 'Play Classic'
document.getElementById('playClassic').addEventListener('click', function ()
{
	nbPlayers = 2;
	switchScreen('playerNamesScreen');
	console.log('Requesting players nicknames');
});

// Button 'Play Multiplayer'
document.getElementById('playMultiplayer').addEventListener('click', function ()
{
	switchScreen('gameScreen');
	console.log('Launching a multiplayer pong game');
});

// Button 'Play Remote'
document.getElementById('playRemote').addEventListener('click', function ()
{
	nbPlayers = 1;
	switchScreen('gameScreen');
	classicPongGame();
	console.log('Launching a game in remote');
});