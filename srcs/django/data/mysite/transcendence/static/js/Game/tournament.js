/******************************** TOURNAMENT ********************************/
// Update the tournament screen according to the stage
function updateTournamentScreen(stage)
{
	const stages = [	'First game:',
						'Second game:',
						'Small Final game:',
						'Final game:',
						'We have a winner! Well played all!'];
	
	document.getElementById('tournamentStage').textContent = stages[stage];

	if (tournament.playedGames > 3)
	{
		document.getElementById('tournamentMatchup').style.display = 'none';
		document.getElementById('startTournamentGame').style.display = 'none';
		document.getElementById('menuFromTournament').style.display = 'block';
	}
	else
	{
		document.getElementById('tournamentMatchup').style.display = 'block';
		document.getElementById('startTournamentGame').style.display = 'block';
		document.getElementById('menuFromTournament').style.display = 'none';

		// Update opponents names
		document.getElementById('tournamentOpponent1').textContent = tournament.opponent1;
		document.getElementById('tournamentOpponent2').textContent = tournament.opponent2;
	}

	// Update ranking
	updatePlayersRanks();
}

// Update the ranking panel in the tournament screen
function updatePlayersRanks()
{
	const players = [
        { name: tournament.player1, score: tournament.player1Score },
        { name: tournament.player2, score: tournament.player2Score },
        { name: tournament.player3, score: tournament.player3Score },
        { name: tournament.player4, score: tournament.player4Score }
    ];

    // Trier le tableau par scores (ordre décroissant)
    players.sort((a, b) => b.score - a.score);

    // Mettre à jour le classement dans le HTML
    document.getElementById('player1Rank').textContent = players[0].name;
    document.getElementById('player1Wins').textContent = players[0].score;
    
    document.getElementById('player2Rank').textContent = players[1].name;
    document.getElementById('player2Wins').textContent = players[1].score;

    document.getElementById('player3Rank').textContent = players[2].name;
    document.getElementById('player3Wins').textContent = players[2].score;

    document.getElementById('player4Rank').textContent = players[3].name;
    document.getElementById('player4Wins').textContent = players[3].score;
}

// Setup tournament, return false in case of error
function setUpTournament()
{
	if (!tournament.running)
		return (false);

	console.log(`== Tournament ==`);
	console.log(`= Game n°${tournament.playedGames + 1} =`);
	console.log(``);

	switch (tournament.playedGames)
	{
		case 0:
			setUpTournamentFirstGame();
			break;
		case 1:
			setUpTournamentSecondGame();
			break;
		case 2:
			setUpTournamentThirdGame();
			break;
		case 3:
			setUpTournamentFourthGame();
			break;
		case 4:
			break;
		default:
			console.error(`Tournament: Too much games played... Returning to the menu`);
			return (false);
	}

	if (tournament.playedGames !== 4)
	{
		if (tournament.opponent1 === null || tournament.opponent2 === null)
		{
			console.error(`Error while setting up tournament opponents`);
			return (false);
		}
	
		document.getElementById('player1Label').textContent = tournament.opponent1;
		document.getElementById('player2Label').textContent = tournament.opponent2;
	}

	updateTournamentScreen(tournament.playedGames);

	return (true);
}

function setUpTournamentFirstGame()
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

function setUpTournamentThirdGame()
{
	let first;
	let second;

	if (tournament.player1Score < 0)
		first = tournament.player1;
	else if (tournament.player2Score < 0)
		first = tournament.player2;
	else if (tournament.player3Score < 0)
		first = tournament.player3;
	else
	{
		console.log(`Error while setting 3rd game opponents in tournament`);
		tournament.opponent1 = null;
		tournament.opponent2 = null;
		return;
	}

	if (tournament.player2Score < 0 && first !== tournament.player2)
		second = tournament.player2;
	else if (tournament.player3Score < 0 && first !== tournament.player3)
		second = tournament.player3;
	else if (tournament.player4Score < 0 && first !== tournament.player4)
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

	console.log(`Setting 3rd tournament game (small final): ${tournament.opponent1} VS ${tournament.opponent2}`);
}

function setUpTournamentFourthGame()
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
		console.log(`Error while setting 4th game opponents in tournament`);
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
		console.log(`Error while setting 4th game opponents in tournament`);
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

	console.log(`Setting last tournament game (final): ${tournament.opponent1} VS ${tournament.opponent2}`);
}

function tournamentGameEnded(winner)
{
	if (!tournament.running)
		return;

	tournament.playedGames++;
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
				if (tournament.player1Score === 0)
					tournament.player1Score--;
				break;
			case tournament.player2:
				if (tournament.player2Score === 0)
					tournament.player2Score--;
				break;
			case tournament.player3:
				if (tournament.player3Score === 0)
					tournament.player3Score--;
				break;
			case tournament.player4:
				if (tournament.player4Score === 0)
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
				if (tournament.player1Score === 0)
					tournament.player1Score--;
				break;
			case tournament.player2:
				if (tournament.player2Score === 0)
					tournament.player2Score--;
				break;
			case tournament.player3:
				if (tournament.player3Score === 0)
					tournament.player3Score--;
				break;
			case tournament.player4:
				if (tournament.player4Score === 0)
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

// Button 'Start Game'
document.getElementById('startTournamentGame').addEventListener('click', function () {
	switchScreen('gameScreen');
});

// Button 'Back to menu'
document.getElementById('menuFromTournament').addEventListener('click', function () {
	switchScreen('menuScreen');
});