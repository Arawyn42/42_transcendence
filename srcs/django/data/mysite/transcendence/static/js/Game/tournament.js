/******************************** TOURNAMENT ********************************/
function setUpTournament()
{
	if (!tournament.running)
		return;

	switch (tournament.playedGames)
	{
		case 0:
			SetUpTournamentFirstGame();
			break;
		case 1:

			break;
		default:
			console.error(`Tournament: Too much games played... Returning to the menu`);
			tournament.running = false;
			switchScreen('menuScreen');
			return;
	}

	document.getElementById('player1Label').textContent = tournament.opponent1;
	document.getElementById('player2Label').textContent = tournament.opponent2;

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