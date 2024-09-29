/******************************* COLLISIONS *********************************/
// Detect wall and paddles collisions
function detectCollisions(game)
{
	// Detect wall collisions
	detectVerticalCollision(game);
	detectHorizontalCollision(game);

	// Detect paddles collisions
	detectPaddleCollision(game, game.paddle1);
	detectPaddleCollision(game, game.paddle2);
	detectPaddleCollision(game, game.paddle3);
	detectPaddleCollision(game, game.paddle4);
}

// Vertical wall collisions
function detectVerticalCollision(game)
{
	switch (gameMode)
	{
		case 'classic':
			if (game.ball.y + game.ball.radius >= canvas.height || game.ball.y - game.ball.radius <= 0)
			{
				game.ball.dx *= BALL_ACCELERATION_X;
				game.ball.dy *= -BALL_ACCELERATION_Y;
			}
			break;
		case 'multi':
			if ((game.ball.y + game.ball.radius >= canvas.height && !game.paddle4.alive)
				|| (game.ball.y - game.ball.radius <= 0 && !game.paddle3.alive))
			{
				game.ball.dx *= BALL_ACCELERATION_X;
				game.ball.dy *= -BALL_ACCELERATION_Y;
			}
			break;
	}

	if (Math.abs(game.ball.dx) > BALL_MAX_SPEED)
		game.ball.dx = BALL_MAX_SPEED * game.ball.dx / Math.abs(game.ball.dx);
	if (Math.abs(game.ball.dy) > BALL_MAX_SPEED)
		game.ball.dy = BALL_MAX_SPEED * game.ball.dy / Math.abs(game.ball.dy);
}

// Horizontal wall collisions
function detectHorizontalCollision(game)
{
	if (gameMode === 'classic')
		return;
	
	if ((game.ball.x + game.ball.radius >= canvas.width && !game.paddle2.alive)
		|| (game.ball.x - game.ball.radius <= 0 && !game.paddle1.alive))
	{
		game.ball.dx *= -BALL_ACCELERATION_X;
		if (Math.abs(game.ball.dx) > BALL_MAX_SPEED)
			game.ball.dx = BALL_MAX_SPEED * game.ball.dx / Math.abs(game.ball.dx);
	}
}

// Paddle collisions
function detectPaddleCollision(game, paddle)
{
	if (!paddle.alive)
		return;

	if (game.ball.x - game.ball.radius <= paddle.x + paddle.width
		&& game.ball.x + game.ball.radius >= paddle.x
		&& game.ball.y + game.ball.radius >= paddle.y
		&& game.ball.y - game.ball.radius <= paddle.y + paddle.height)
	{
		if ('dy' in paddle)
		{
			game.ball.dx *= -BALL_ACCELERATION_X;
			if (Math.abs(game.ball.dx) > BALL_MAX_SPEED)
				game.ball.dx = BALL_MAX_SPEED * game.ball.dx / Math.abs(game.ball.dx);
	
			if (game.ball.dx < 0 && aiDifficulty > 0 && nbPlayers === 1)
				game.ai2.hitCount++;
		}
		else if ('dx' in paddle)
		{
			game.ball.dy *= -BALL_ACCELERATION_Y;
			if (Math.abs(game.ball.dy) > BALL_MAX_SPEED)
				game.ball.dx = BALL_MAX_SPEED * game.ball.dy / Math.abs(game.ball.dy);

			if (game.ball.dy < 0 && nbPlayers < 4)
				game.ai4.hitCount++;
			else if (game.ball.dy > 0 && nbPlayers < 3)
				game.ai3.hitCount++;
		}
	}
}
