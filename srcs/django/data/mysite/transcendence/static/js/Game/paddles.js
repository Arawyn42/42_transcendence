/********************************* DRAWING **********************************/
// Draw all paddles
function drawAllPaddles(game)
{
	const player1Score = parseInt(document.getElementById('player1Score').textContent);
	const player2Score = parseInt(document.getElementById('player2Score').textContent);
	const player3Score = parseInt(document.getElementById('player3Score').textContent);
	const player4Score = parseInt(document.getElementById('player4Score').textContent);
	
	switch (gameMode)
	{
		case 'classic':
			drawPaddle(game.paddle1);
			drawPaddle(game.paddle2);
			break;
		case 'multi':
			if (player1Score > 0)
				drawPaddle(game.paddle1);
			if (player2Score > 0)
				drawPaddle(game.paddle2);
			if (player3Score > 0)
				drawPaddle(game.paddle3);
			if (player4Score > 0)
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
	ctx.fillStyle = BLACK;
	ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}


/******************************** MOVEMENTS *********************************/
// Move all paddles
function moveAllPaddles(game)
{
	const player1Score = parseInt(document.getElementById('player1Score').textContent);
	const player2Score = parseInt(document.getElementById('player2Score').textContent);
	const player3Score = parseInt(document.getElementById('player3Score').textContent);
	const player4Score = parseInt(document.getElementById('player4Score').textContent);
	
	switch (gameMode)
	{
		case 'classic':
			movePaddle(game.paddle1);
			movePaddle(game.paddle2);
			break;
		case 'multi':
			if (player1Score > 0)
				movePaddle(game.paddle1);
			if (player2Score > 0)
				movePaddle(game.paddle2);
			if (player3Score > 0)
				movePaddle(game.paddle3);
			if (player4Score > 0)
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