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
	ctx.fillStyle = '#222';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the header ("PONG")
function drawHeader()
{
	ctx.font = '64px Arial';
	ctx.fillStyle = '#fff';
	const headerText = 'PONG';
	const headerTextWidth = ctx.measureText(headerText).width;
	ctx.fillText(headerText, (canvas.width - headerTextWidth) / 2, 50);
}

// Draw the score
function drawScore(game)
{
	ctx.font = '48px Arial';
	ctx.fillStyle = '#fff';

	// Score 1
	const score1Text = game.score1.toString();
	const score1Width = ctx.measureText(score1Text).width;
	const score1PosX = canvas.width / 2 - game.area.width / 4 - score1Width / 2;
	
	// Score 2
	const score2Text = game.score2.toString();
	const score2Width = ctx.measureText(score2Text).width;
	const score2PosX = canvas.width / 2 + game.area.width / 4 - score2Width / 2;
	
	const scorePosY = 100;
	
	ctx.fillText(score1Text, score1PosX, scorePosY);
	ctx.fillText(score2Text, score2PosX, scorePosY);
}

// Draw the game area
function drawGameArea(game)
{
	ctx.strokeStyle = '#fff';
	ctx.lineWidth = 5;
	ctx.fillStyle = '#444';
	ctx.fillRect((canvas.width - game.area.width) / 2, game.area.y, game.area.width, game.area.height);
	ctx.strokeRect((canvas.width - game.area.width) / 2, game.area.y, game.area.width, game.area.height);
}

// Draw the scene (background, header, game, game area)
function drawScene(game)
{
	drawBackground();
	drawHeader();
	drawScore(game);
	drawGameArea(game);
}

// Draw a countdown before a game starts
function drawCountdown(game)
{
	ctx.font = '72px Arial';
	ctx.fillStyle = '#fff';
	const text = game.countdown > 0 ? game.countdown.toString() : 'GO';
	const textWidth = ctx.measureText(text).width;
	ctx.fillText(text, (canvas.width - game.area.width) / 2 +(game.area.width - textWidth) / 2, game.area.y + game.area.height / 2);
}

// Draw a rectangle
function drawRect(x, y, width, height)
{
	ctx.fillStyle = "#fff";
	ctx.fillRect(x, y, width, height);
}

// Draw a circle
function drawCircle(x, y, radius)
{
	ctx.fillStyle = '#fff';
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
	if (paddle.y < game.area.y)
		paddle.y = game.area.y;
	if (paddle.y + paddle.height > game.area.y + game.area.height)
		paddle.y = game.area.y + game.area.height - paddle.height;
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
	// Game area
	const gameArea =
	{
		y: 120,
		width: 800,
		height: 600
	};

	// Game states and game
	let game =
	{
		state: 'countdown',
		countdown: 3,
		area: gameArea,
		score1: 0,
		score2: 0
	};

	// Paddle and ball dimensions
	const paddleWidth = 10;
	const paddleHeight = 100;
	const ballRadius = 10;

	// Paddle 1
	let paddle1 =
	{
		x: (canvas.width - game.area.width) / 2 + 10,
		y: game.area.y + game.area.height / 2 - paddleHeight / 2,
		width: paddleWidth,
		height: paddleHeight,
		dy: 0
	};

	// Paddle 2
	let paddle2 =
	{
		x: (canvas.width - game.area.width) / 2 + game.area.width - paddleWidth - 10,
		y: game.area.y + game.area.height / 2 - paddleHeight / 2,
		width: paddleWidth,
		height: paddleHeight,
		dy: 0
	};

	// Ball
	let ball =
	{
		x: canvas.width / 2,
		y: game.area.y + game.area.height / 2,
		dx: 4 * (Math.random() > 0.5 ? 1 : -1),
		dy: 4 * (Math.random() > 0.5 ? 1 : -1),
		radius: ballRadius
	};

	document.addEventListener('keydown', (e) => handleKeyDown(e, paddle1, paddle2));
	document.addEventListener('keyup', (e) => handleKeyUp(e, paddle1, paddle2));

	classicPongReset(game, paddle1, paddle2, ball);
	classicPongLoop(game, paddle1, paddle2, ball);
}