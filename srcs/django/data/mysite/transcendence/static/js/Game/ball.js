/********************************* DRAWING **********************************/
// Draw the ball (a circle)
function drawBall(ball)
{
	ctx.fillStyle = BLACK;
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);

	ctx.fill();
	ctx.closePath();	
}


/******************************** MOVEMENTS *********************************/
// Ball movements
function moveBall(game)
{
	let player1Score = parseInt(document.getElementById('player1Score').textContent);
	let player2Score = parseInt(document.getElementById('player2Score').textContent);
	let player3Score = parseInt(document.getElementById('player3Score').textContent);
	let player4Score = parseInt(document.getElementById('player4Score').textContent);

	game.ball.x += game.ball.dx;
	game.ball.y += game.ball.dy;

	switch (gameMode)
	{
		case 'classic':
			if (game.ball.x - game.ball.radius < 0)
			{
				player2Score++;
				setScore(2, player2Score);
				checkScores(game);
			}
			else if (game.ball.x + game.ball.radius > canvas.width)
			{
				player1Score++;
				setScore(1, player1Score);
				checkScores(game);
			}
			break;
		case 'multi':
			if (game.ball.x - game.ball.radius < 0 && player1Score > 0)
			{
				player1Score--;
				setScore(1, player1Score);
				checkScores(game);
			}
			else if (game.ball.x + game.ball.radius > canvas.width && player2Score > 0)
			{
				player2Score--;
				setScore(2, player2Score);
				checkScores(game);
			}
			else if (game.ball.y - game.ball.radius < 0 && player3Score > 0)
			{
				player3Score--;
				setScore(3, player3Score);
				checkScores(game);
			}
			else if (game.ball.y + game.ball.radius > canvas.height && player4Score > 0)
			{
				player4Score--;
				setScore(4, player4Score);
				checkScores(game);
			}
			break;
	}
}
