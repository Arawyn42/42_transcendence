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

// Display the buttons according to the current mode
function updateEndScreen()
{
	if (tournament.running)
	{
		if (tournament.playedGames > 3)
		{
			document.getElementById('tournamentResults').style.display = 'block';
			document.getElementById('nextTournamentGame').style.display = 'none';
		}
		else
		{
			document.getElementById('tournamentResults').style.display = 'none';
			document.getElementById('nextTournamentGame').style.display = 'block';
		}
		document.getElementById('restartClassicGame').style.display = 'none';
	}
	else
	{
		document.getElementById('nextTournamentGame').style.display = 'none';
		document.getElementById('tournamentResults').style.display = 'none';
		document.getElementById('restartClassicGame').style.display = 'block';
	}
}