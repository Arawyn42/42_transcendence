// Button 'Restart'
document.getElementById('restartGame').addEventListener('click', function ()
{
	switchScreen('gameScreen');
	classicPongGame();
	console.log('Restarting game');
});

// Button 'Back to Menu'
document.getElementById('backToMenu').addEventListener('click', function ()
{
	switchScreen('menuScreen');
	console.log('Back to Menu');
});