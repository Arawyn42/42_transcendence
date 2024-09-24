/********************************** SCORES **********************************/
// Set scores of a given player (if player === 0, set all players scores)
function setScore(player, score)
{
	if (player === 1)
		document.getElementById('player1Score').textContent = score;
	else if (player === 2)
		document.getElementById('player2Score').textContent = score;
	else if (player === 3)
		document.getElementById('player3Score').textContent = score;
	else if (player === 4)
		document.getElementById('player4Score').textContent = score;
	else if (player === 0)
	{
		document.getElementById('player1Score').textContent = score;
		document.getElementById('player2Score').textContent = score;
		document.getElementById('player3Score').textContent = score;
		document.getElementById('player4Score').textContent = score;
	}
}

function checkScores(game)
{
	let player1Score = parseInt(document.getElementById('player1Score').textContent);
	let player2Score = parseInt(document.getElementById('player2Score').textContent);
	let player3Score = parseInt(document.getElementById('player3Score').textContent);
	let player4Score = parseInt(document.getElementById('player4Score').textContent);

	switch (gameMode)
	{
		case 'classic':
			if (player1Score >= MAX_SCORE) // Player 1 wins
			{
				sendScoreUpdate('win');
				setScore(0, 0);
				game.state = 'end1';
				return;
			}
			if (player2Score >= MAX_SCORE) // Player 2 wins
			{
				sendScoreUpdate('loose');
				setScore(0, 0);
				game.state = 'end2';
				return;
			}
			break;
		case 'multi':
			if (player2Score <= 0 && player3Score <= 0 // Player 1 wins
				&& player4Score <= 0)
			{
				sendScoreUpdate('win');
				setScore(0, MAX_SCORE);
				game.state = 'end1';
				return;
			}
			if (player1Score <= 0 && player3Score <= 0 // Player 2 wins
				&& player4Score <= 0)
			{
				sendScoreUpdate('loose');
				setScore(0, MAX_SCORE);
				game.state = 'end2';
				return;
			}
			if (player1Score <= 0 && player2Score <= 0 // Player 3 wins
				&& player4Score <= 0)
			{
				sendScoreUpdate('loose');
				setScore(0, MAX_SCORE);
				game.state = 'end3';
				return;
			}
			if (player1Score <= 0 && player2Score <= 0 // Player 4 wins
				&& player3Score <= 0)
			{
				sendScoreUpdate('loose');
				setScore(0, MAX_SCORE);
				game.state = 'end4';
				return;
			}
			break;
		default:
			console.error('Wrong game mode');
			break;
	}

	resetGame(game);
}
