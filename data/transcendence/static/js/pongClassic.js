/******************************** RESET GAME ********************************/
// Reset paddles and ball and start the countdown
function classicPongReset(game, paddle1, paddle2, ball)
{
	paddle1.y = game.area.y + game.area.height / 2 - paddle1.height / 2;
	paddle2.y = game.area.y + game.area.height / 2 - paddle2.height / 2;

	ball.x = canvas.width / 2;
	ball.y = game.area.y + game.area.height / 2;
	ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
	ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);

	game.state = 'countdown';
	game.countdown = 3;
	startCountdown(game);
}

// Start the countdown, then change the game state
function startCountdown(game)
{
	const countdownInterval = setInterval(() =>
	{
		game.countdown--;
		if (game.countdown < 0)
		{
			clearInterval(countdownInterval);
			game.state = 'playing';
		}
	}, 1000);
}


/********************************* DRAWING **********************************/
// Draw the canvas background
function drawBackground()
{
	ctx.fillStyle = BLACK;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the header ("PONG")
function drawHeader(game)
{
	// Title 'PONG'
	ctx.font = `${TITLE_SIZE}px "Press Start 2P", cursive`;
	ctx.fillStyle = WHITE;
	const headerText = 'PONG';
	const headerTextWidth = ctx.measureText(headerText).width;
	ctx.fillText(headerText, (canvas.width - headerTextWidth) / 2, TITLE_POS_Y);

	ctx.font = `${SUBTITLE_SIZE}px "Press Start 2P", cursive`;

	// Player 1
	const player1Text = `PLAYER 1`;
	const player1Width = ctx.measureText(player1Text).width;
	const player1PosX = canvas.width / 2 - game.area.width / 3 - player1Width / 2;
	ctx.fillText(player1Text, player1PosX, TITLE_POS_Y);
	
	// Player 2
	const player2Text = `PLAYER 2`;
	const player2Width = ctx.measureText(player2Text).width;
	const player2PosX = canvas.width / 2 + game.area.width / 3 - player2Width / 2;
	ctx.fillText(player2Text, player2PosX, TITLE_POS_Y);
}

// Draw the score
function drawScore(game)
{
	ctx.font = `${SUBTITLE_SIZE}px "Press Start 2P", cursive`;
	ctx.fillStyle = WHITE;

	// Score 1
	const score1Text = game.score1.toString();
	const score1Width = ctx.measureText(score1Text).width;
	const score1PosX = canvas.width / 2 - game.area.width / 3 - score1Width / 2;
	ctx.fillText(score1Text, score1PosX, SCORES_POS_Y);
	
	// Score 2
	const score2Text = game.score2.toString();
	const score2Width = ctx.measureText(score2Text).width;
	const score2PosX = canvas.width / 2 + game.area.width / 3 - score2Width / 2;
	ctx.fillText(score2Text, score2PosX, SCORES_POS_Y);
}

// Draw the game area
function drawGameArea(game)
{
	ctx.strokeStyle = WHITE;
	ctx.lineWidth = 5;
	ctx.fillStyle = WHITE;
	ctx.fillRect((canvas.width - game.area.width) / 2, game.area.y, game.area.width, game.area.height);
	ctx.strokeRect((canvas.width - game.area.width) / 2, game.area.y, game.area.width, game.area.height);
}

// Draw the scene (background, header, game, game area)
function drawScene(game)
{
	drawBackground();
	drawHeader(game);
	drawScore(game);
	drawGameArea(game);
}

// Draw a countdown before a game starts
function drawCountdown(game)
{
	ctx.font = `${TITLE_SIZE * 2}px "Press Start 2P", cursive`;
	ctx.fillStyle = BLACK;
	const text = game.countdown > 0 ? game.countdown.toString() : 'GO';
	const textWidth = ctx.measureText(text).width;
	ctx.fillText(text, (canvas.width - game.area.width) / 2 +(game.area.width - textWidth) / 2, game.area.y + game.area.height / 2 + TITLE_SIZE / 2);
}

// Draw a rectangle
function drawRect(x, y, width, height)
{
	ctx.fillStyle = BLACK;
	ctx.fillRect(x, y, width, height);
}

// Draw a circle
function drawCircle(x, y, radius)
{
	ctx.fillStyle = BLACK;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);

	ctx.fill();
	ctx.closePath();	
}

/******************************* COLLISIONS *********************************/
// Wall collisions
function detectWallCollision(game, ball)
{
	if (ball.y + ball.radius >= game.area.y + game.area.height || ball.y - ball.radius <= game.area.y)
		ball.dy *= -1;
}

// Paddle collisions
function detectPaddleCollision(ball, paddle)
{
	if (ball.x - ball.radius <= paddle.x + paddle.width
		&& ball.x + ball.radius >= paddle.x
		&& ball.y + ball.radius >= paddle.y
		&& ball.y - ball.radius <= paddle.y + paddle.height)
		ball.dx *= -1;
}

/******************************** MOVEMENTS *********************************/
// Paddle movements
function movePaddle(game, paddle)
{
	paddle.y += paddle.dy;
	if (paddle.y <= game.area.y + 2)
		paddle.y = game.area.y + 2;
	if (paddle.y + paddle.height >= game.area.y + game.area.height - 2)
		paddle.y = game.area.y + game.area.height - 2 - paddle.height;
}

// Ball movements
function moveBall(game, paddle1, paddle2, ball)
{
	ball.x += ball.dx;
	ball.y += ball.dy;

	detectWallCollision(game, ball);

	if (ball.x - ball.radius < (canvas.width - game.area.width) / 2)
	{
		game.score2++;
		if (game.score2 >= MAX_SCORE)
		{
			game.state = 'end2';
			return;
		}
		classicPongReset(game, paddle1, paddle2, ball);
	}
	else if (ball.x + ball.radius > (canvas.width - game.area.width) / 2 + game.area.width)
	{
		game.score1++;
		if (game.score1 >= MAX_SCORE)
		{
			game.state = 'end1';
			return;
		}
		classicPongReset(game, paddle1, paddle2, ball);
	}
}


/****************************** EVENTS HANDLER ******************************/
// When a key is pressed
function handleKeyDown(e, paddle1, paddle2)
{
	switch (e.key)
	{
		case 'w':
		case 'z':
			paddle1.dy = -8;
			break;
		case 's':
			paddle1.dy = 8;
			break;
		case 'ArrowUp':
			paddle2.dy = -8;
			break;
		case 'ArrowDown':
			paddle2.dy = 8;
			break;
	}
}

// When a key is released
function handleKeyUp(e, paddle1, paddle2)
{
	switch (e.key)
	{
		case 'w':
		case 'z':
		case 's':
			paddle1.dy = 0;
			break;
		case 'ArrowUp':
		case 'ArrowDown':
			paddle2.dy = 0;
			break;
	}
}

/******************************** MAIN LOOP *********************************/
function classicPongLoop(game, paddle1, paddle2, ball)
{
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the scene
	drawScene(game);

	switch (game.state)
	{
		case 'playing':
			// Move and draw paddles
			movePaddle(game, paddle1);
			movePaddle(game, paddle2);
			drawRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
			drawRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
		
			// Move and draw ball
			moveBall(game, paddle1, paddle2, ball);
			drawCircle(ball.x, ball.y, ball.radius);
		
			// Detect paddles' collisions
			detectPaddleCollision(ball, paddle1);
			detectPaddleCollision(ball, paddle2);
			break;
		case 'countdown':
			drawCountdown(game);
			break;
		case 'end1':
			launchScene('end1');
			return;
		case 'end2':
			launchScene('end2');
			return;
	}

	// Call this function recursively each frame
	requestAnimationFrame(() => classicPongLoop(game, paddle1, paddle2, ball));
}

function classicPongGame()
{
	const gameArea = {
		y: GAME_AREA_POS_Y,
		width: GAME_AREA_WIDTH,
		height: GAME_AREA_HEIGHT
	};

	let game = {
		state: 'countdown',
		countdown: 3,
		area: gameArea,
		score1: 0,
		score2: 0
	};

	let paddle1 = {
		x: (canvas.width - game.area.width) / 2 + BALL_RADIUS / 4,
		y: game.area.y + game.area.height / 2 - PADDLE_HEIGHT / 2,
		width: PADDLE_WIDTH,
		height: PADDLE_HEIGHT,
		dy: 0
	};

	let paddle2 = {
		x: (canvas.width - game.area.width) / 2 + game.area.width - PADDLE_WIDTH - BALL_RADIUS / 4,
		y: game.area.y + game.area.height / 2 - PADDLE_HEIGHT / 2,
		width: PADDLE_WIDTH,
		height: PADDLE_HEIGHT,
		dy: 0
	};

	let ball = {
		x: canvas.width / 2,
		y: game.area.y + game.area.height / 2,
		dx: 4 * (Math.random() > 0.5 ? 1 : -1),
		dy: 4 * (Math.random() > 0.5 ? 1 : -1),
		radius: BALL_RADIUS
	};

	document.addEventListener('keydown', (e) => handleKeyDown(e, paddle1, paddle2));
	document.addEventListener('keyup', (e) => handleKeyUp(e, paddle1, paddle2));

	classicPongReset(game, paddle1, paddle2, ball);
	classicPongLoop(game, paddle1, paddle2, ball);

	document.removeEventListener('keydown', handleKeyDown);
	document.removeEventListener('keyup', handleKeyUp);
}