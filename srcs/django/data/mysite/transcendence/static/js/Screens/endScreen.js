/******************************** END SCREEN ********************************/
// Button 'Restart'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('restartClassicGame').addEventListener('click', function ()
	{
		switchScreen('gameScreen');
		console.log('Restarting game');
	});
});

// Button 'Next Game'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('nextTournamentGame').addEventListener('click', function ()
	{
		switchScreen('tournamentScreen');
		console.log('Going to tournament screen for the next game');
	});
});

// Button 'Results'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('tournamentResults').addEventListener('click', function ()
	{
		switchScreen('tournamentScreen');
		console.log('Going to tournament screen for the next game');
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