/******************************** RESET GAME ********************************/
// Reset paddles and ball and start the countdown
function classicPongReset(game, paddle1, paddle2, ball)
{
	paddle1.y = canvas.height / 2 - paddle1.height / 2;
	paddle2.y = canvas.height / 2 - paddle2.height / 2;

	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
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

// Set scores
function setScore(player, score)
{
	if (player === 1)
		document.getElementById('player1Score').textContent = score;
	else if (player === 2)
		document.getElementById('player2Score').textContent = score;
	else if (player === 0)
	{
		document.getElementById('player1Score').textContent = score;
		document.getElementById('player2Score').textContent = score;
	}
}


/********************************* DRAWING **********************************/
// Draw a countdown before a game starts
function drawCountdown(game)
{
	const size = parseInt(window.getComputedStyle(document.getElementById('pongTitle')).fontSize, 10);
	ctx.font = `${size * 2}px "Press Start 2P", cursive`;
	ctx.fillStyle = BLACK;
	const text = game.countdown > 0 ? game.countdown.toString() : 'GO';
	const textWidth = ctx.measureText(text).width;
	ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2 + size / 2);
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
	if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0)
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
	if (paddle.y <= 2)
		paddle.y = 2;
	if (paddle.y + paddle.height >= canvas.height - 2)
		paddle.y = canvas.height - 2 - paddle.height;
}

// Ball movements
function moveBall(game, paddle1, paddle2, ball)
{
	ball.x += ball.dx;
	ball.y += ball.dy;

	detectWallCollision(game, ball);

	if (ball.x - ball.radius < 0)
	{
		let player2Score = parseInt(document.getElementById('player2Score').textContent);
		player2Score++;
		setScore(2, player2Score);
		if (player2Score >= MAX_SCORE)
		{
			setScore(0, 0);
			game.state = 'end2';
			return;
		}
		classicPongReset(game, paddle1, paddle2, ball);
	}
	else if (ball.x + ball.radius > canvas.width)
	{
		let player1Score = parseInt(document.getElementById('player1Score').textContent);
		player1Score++;
		setScore(1, player1Score);
		if (player1Score >= MAX_SCORE)
		{
			setScore(0, 0);
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
	// Prevent the default behaviour of ArrowUp and ArrowDown
    if (["ArrowUp", "ArrowDown"].includes(e.key))
        e.preventDefault();

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
	// Prevent the default behaviour of ArrowUp and ArrowDown
    if (["ArrowUp", "ArrowDown"].includes(e.key))
        e.preventDefault();
	
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
			document.getElementById('winnerMessage').textContent = "Player 1 won!";
			switchScreen('classicEndScreen');
			return;
		case 'end2':
			document.getElementById('winnerMessage').textContent = "Player 2 won!";
			launchScene('classicEndScreen');
			return;
	}

	// Call this function recursively each frame
	requestAnimationFrame(() => classicPongLoop(game, paddle1, paddle2, ball));
}

function classicPongGame()
{

	let game = {
		state: 'countdown',
		countdown: 3
	};

	let paddle1 = {
		x: BALL_RADIUS / 4,
		y: canvas.height / 2 - PADDLE_HEIGHT / 2,
		width: PADDLE_WIDTH,
		height: PADDLE_HEIGHT,
		dy: 0
	};

	let paddle2 = {
		x: canvas.width - PADDLE_WIDTH - BALL_RADIUS / 4,
		y: canvas.height / 2 - PADDLE_HEIGHT / 2,
		width: PADDLE_WIDTH,
		height: PADDLE_HEIGHT,
		dy: 0
	};

	let ball = {
		x: canvas.width / 2,
		y: canvas.height / 2,
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