/******************************** TOURNAMENT ********************************/
// Update the tournament Screen according to the stage
function updateTournamentScreen(stage)
{
	const stages = ['First game', 'Second game', 'Final game'];
	document.getElementById('tournamentStage').textContent = stages[stage];

	document.getElementById('tournamentPlayer1').textContent = tournament.opponent1;
	document.getElementById('tournamentPlayer2').textContent = tournament.opponent2;

	document.getElementById('tournamentPlayer1Score').textContent = getPlayerScore(tournament.opponent1);
	document.getElementById('tournamentPlayer2Score').textContent = getPlayerScore(tournament.opponent2);
}

// Return the player's score (number of games won)
function getPlayerScore(player)
{
	switch (player)
	{
		case tournament.player1:
			return tournament.player1Score;
		case tournament.player2:
			return tournament.player2Score;
		case tournament.player3:
			return tournament.player3Score;
		case tournament.player4:
			return tournament.player4Score;
		default:
			return 0;
	}
}

// Setup tournament, return false in case of error
function setUpTournament()
{
	if (!tournament.running)
		return (false);

	switch (tournament.playedGames)
	{
		case 0:
			SetUpTournamentFirstGame();
			break;
		case 1:
			setUpTournamentSecondGame();
			break;
		case 2:
			SetUpTournamentThirdGame();
			break;
		default:
			console.error(`Tournament: Too much games played... Returning to the menu`);
			return (false);
	}

	if (tournament.opponent1 === null || tournament.opponent2 === null)
	{
		console.error(`Error while setting up tournament opponents`);
		return (false);
	}

	document.getElementById('player1Label').textContent = tournament.opponent1;
	document.getElementById('player2Label').textContent = tournament.opponent2;

	updateTournamentScreen(tournament.playedGames);

	return (true);
}

function SetUpTournamentFirstGame()
{
	const rand = Math.random();
	const rand2 = Math.random();

	if (rand <= 0.25)
	{
		tournament.opponent1 = tournament.player1;
		if (rand2 <= 0.33)
			tournament.opponent2 = tournament.player2;
		else if (rand2 <= 0.66)
			tournament.opponent2 = tournament.player3;
		else
			tournament.opponent2 = tournament.player4;
	}
	else if (rand <= 0.5)
	{
		tournament.opponent1 = tournament.player2;
		if (rand2 <= 0.33)
			tournament.opponent2 = tournament.player1;
		else if (rand2 <= 0.66)
			tournament.opponent2 = tournament.player3;
		else
			tournament.opponent2 = tournament.player4;
	}
	else if (rand <= 0.75)
	{
		tournament.opponent1 = tournament.player3;
		if (rand2 <= 0.33)
			tournament.opponent2 = tournament.player1;
		else if (rand2 <= 0.66)
			tournament.opponent2 = tournament.player2;
		else
			tournament.opponent2 = tournament.player4;
	}
	else
	{
		tournament.opponent1 = tournament.player4;
		if (rand2 <= 0.33)
			tournament.opponent2 = tournament.player1;
		else if (rand2 <= 0.66)
			tournament.opponent2 = tournament.player2;
		else
			tournament.opponent2 = tournament.player3;
	}

	console.log(`Setting first tournament game: ${tournament.opponent1} VS ${tournament.opponent2}`);

}

function setUpTournamentSecondGame()
{
	let first;
	let second;

	if (tournament.player1Score === 0)
		first = tournament.player1;
	else if (tournament.player2Score === 0)
		first = tournament.player2;
	else if (tournament.player3Score === 0)
		first = tournament.player3;
	else
	{
		console.error('Error while setting 2nd game opponents in tournament');
		tournament.opponent1 = null;
		tournament.opponent2 = null;
		return;
	}

	if (tournament.player2Score === 0 && first !== tournament.player2)
		second = tournament.player2;
	else if (tournament.player3Score === 0 && first !== tournament.player3)
		second = tournament.player3;
	else if (tournament.player4Score === 0 && first !== tournament.player4)
		second = tournament.player4;
	else
	{
		console.error('Error while setting 2nd game opponents in tournament');
		tournament.opponent1 = null;
		tournament.opponent2 = null;
		return;
	}

	if (Math.random() <= 0.5)
	{
		tournament.opponent1 = first;
		tournament.opponent2 = second;
	}
	else
	{
		tournament.opponent1 = second;
		tournament.opponent2 = first;
	}

	console.log(`Setting second tournament game: ${tournament.opponent1} VS ${tournament.opponent2}`);
}

function SetUpTournamentThirdGame()
{
	let first;
	let second;

	if (tournament.player1Score > 0)
		first = tournament.player1;
	else if (tournament.player2Score > 0)
		first = tournament.player2;
	else if (tournament.player3Score > 0)
		first = tournament.player3;
	else
	{
		console.log(`Error while setting 3rd game opponents in tournament`);
		tournament.opponent1 = null;
		tournament.opponent2 = null;
		return;
	}

	if (tournament.player2Score > 0 && first !== tournament.player2)
		second = tournament.player2;
	else if (tournament.player3Score > 0 && first !== tournament.player3)
		second = tournament.player3;
	else if (tournament.player4Score > 0 && first !== tournament.player4)
		second = tournament.player4;
	else
	{
		console.log(`Error while setting 3rd game opponents in tournament`);
		tournament.opponent1 = null;
		tournament.opponent2 = null;
		return;
	}

	if (Math.random() <= 0.5)
	{
		tournament.opponent1 = first;
		tournament.opponent2 = second;
	}
	else
	{
		tournament.opponent1 = second;
		tournament.opponent2 = first;
	}

	console.log(`Setting last tournament game: ${tournament.opponent1} VS ${tournament.opponent2}`);
}

function tournamentGameEnded(winner)
{
	if (!tournament.running)
		return;

	if (winner === 1)
	{
		switch (tournament.opponent1)
		{
			case tournament.player1:
				tournament.player1Score++;
				break;
			case tournament.player2:
				tournament.player2Score++;
				break;
			case tournament.player3:
				tournament.player3Score++;
				break;
			case tournament.player4:
				tournament.player4Score++;
				break;
		}
		switch (tournament.opponent2)
		{
			case tournament.player1:
				tournament.player1Score--;
				break;
			case tournament.player2:
				tournament.player2Score--;
				break;
			case tournament.player3:
				tournament.player3Score--;
				break;
			case tournament.player4:
				tournament.player4Score--;
				break;
		}
	}
	else
	{
		switch (tournament.opponent2)
		{
			case tournament.player1:
				tournament.player1Score++;
				break;
			case tournament.player2:
				tournament.player2Score++;
				break;
			case tournament.player3:
				tournament.player3Score++;
				break;
			case tournament.player4:
				tournament.player4Score++;
				break;
		}
		switch (tournament.opponent1)
		{
			case tournament.player1:
				tournament.player1Score--;
				break;
			case tournament.player2:
				tournament.player2Score--;
				break;
			case tournament.player3:
				tournament.player3Score--;
				break;
			case tournament.player4:
				tournament.player4Score--;
				break;
		}
	}
}

function resetTournament()
{
	tournament.running = false;
	tournament.playedGames = 0;
	tournament.opponent1 = '';
	tournament.opponent2 = '';

	tournament.player1 = '';
	tournament.player1Score = 0;

	tournament.player2 = '';
	tournament.player2Score = 0;

	tournament.player3 = '';
	tournament.player3Score = 0;

	tournament.player4 = '';
	tournament.player4Score = 0;
}