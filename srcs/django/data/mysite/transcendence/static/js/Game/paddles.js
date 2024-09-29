/********************************* DRAWING **********************************/
// Draw all paddles
function drawAllPaddles(game)
{	
	switch (gameMode)
	{
		case 'classic':
			drawPaddle(game.paddle1);
			drawPaddle(game.paddle2);
			break;
		case 'multi':
			drawPaddle(game.paddle1);
			drawPaddle(game.paddle2);
			drawPaddle(game.paddle3);
			drawPaddle(game.paddle4);
			break;
		default:
			console.error('Wrong game mode');
			break;
	}
}

// Draw a paddle (a rectangle)
function drawPaddle(paddle)
{
	if (!paddle.alive)
		return;

	ctx.fillStyle = BLACK;
	ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}


/******************************** MOVEMENTS *********************************/
// Move all paddles
function moveAllPaddles(game)
{
	switch (gameMode)
	{
		case 'classic':
			movePaddle(game.paddle1);
			movePaddle(game.paddle2);
			break;
		case 'multi':
			movePaddle(game.paddle1);
			movePaddle(game.paddle2);
			movePaddle(game.paddle3);
			movePaddle(game.paddle4);
			break;
		default:
			console.error('Wrong game mode');
			break;
	}
}

// Move one paddle
function movePaddle(paddle)
{
	if (!paddle.alive)
		return;

	if ('dy' in paddle)
	{
		paddle.y += paddle.dy;
		if (paddle.y <= 2)
			paddle.y = 2;
		if (paddle.y + paddle.height >= canvas.height - 2)
			paddle.y = canvas.height - 2 - paddle.height;
	}
	else if ('dx' in paddle)
	{
		paddle.x += paddle.dx;
		if (paddle.x <= 2)
			paddle.x = 2;
		if (paddle.x + paddle.width >= canvas.width - 2)
			paddle.x = canvas.width - 2 - paddle.width;
	}
}