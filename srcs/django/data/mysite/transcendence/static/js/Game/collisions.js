/******************************* COLLISIONS *********************************/
// Detect wall and paddles collisions
function detectCollisions(game)
{
	// Detect wall collisions
	detectVerticalCollision(game.ball);
	detectHorizontalCollision(game.ball);

	// Detect paddles collisions
	detectPaddleCollision(game, game.paddle1);
	detectPaddleCollision(game, game.paddle2);

	if (gameMode === 'multi')
	{
		detectPaddleCollision(game, game.paddle3);
		detectPaddleCollision(game, game.paddle4);
	}
}

// Vertical wall collisions
function detectVerticalCollision(ball)
{
	const player3Score = parseInt(document.getElementById('player3Score').textContent);
	const player4Score = parseInt(document.getElementById('player4Score').textContent);

	switch (gameMode)
	{
		case 'classic':
			if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0)
				ball.dy *= -1;
			break;
		case 'multi':
			if ((ball.y + ball.radius >= canvas.height && player4Score <= 0)
				|| (ball.y - ball.radius <= 0 && player3Score <= 0))
				ball.dy *= -1;
			break;
	}
}

// Horizontal wall collisions
function detectHorizontalCollision(ball)
{
	if (gameMode === 'classic')
		return;

	const player1Score = parseInt(document.getElementById('player1Score').textContent);
	const player2Score = parseInt(document.getElementById('player2Score').textContent);
	
	if ((ball.x + ball.radius >= canvas.width && player2Score <= 0)
		|| ball.x - ball.radius <= 0 && player1Score <= 0)
	{
		ball.dx *= -1.03;
		if (Math.abs(ball.dx) > 10)
			ball.dx = 10 * ball.dx / Math.abs(ball.dx);
	}
}

// Paddle collisions
function detectPaddleCollision(game, paddle)
{
	if (game.ball.x - game.ball.radius <= paddle.x + paddle.width
		&& game.ball.x + game.ball.radius >= paddle.x
		&& game.ball.y + game.ball.radius >= paddle.y
		&& game.ball.y - game.ball.radius <= paddle.y + paddle.height)
	{
		if ('dy' in paddle)
		{
			game.ball.dx *= -1.03;
			if (Math.abs(game.ball.dx) > 10)
				game.ball.dx = 10 * game.ball.dx / Math.abs(game.ball.dx);
	
			if (game.ball.dx < 0 && aiDifficulty > 0)
				game.ai.hitCount++;
		}
		else if ('dx' in paddle)
		{
			game.ball.dy *= -1;
		}
	}
}
