/******************************** END SCREEN ********************************/
// Button 'Restart'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('restartClassicGame').addEventListener('click', function ()
	{
		switchScreen('gameScreen');
		console.log('Restarting game');
	});
});

// Button 'Back to Menu'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('menuFromClassicEnd').addEventListener('click', function ()
	{
		switchScreen('menuScreen');
		console.log('Back to Menu');
	});
});