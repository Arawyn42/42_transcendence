// Button 'Play Classic'
document.getElementById('playClassic').addEventListener('click', function ()
{
	switchScreen('gameScreen');
	classicPongGame();
	console.log('Launching a classic pong game');
});

// Button 'Play Multiplayer'
document.getElementById('playMultiplayer').addEventListener('click', function ()
{
	switchScreen('gameScreen');
	console.log('Launching a multiplayer pong game');
});