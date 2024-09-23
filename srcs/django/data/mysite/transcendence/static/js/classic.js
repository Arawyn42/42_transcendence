/******************************** RESET GAME ********************************/
// Full reset
function classicPongFullReset(game)
{
	setScore(0, 0);
	classicPongReset(game);
}

// Reset paddles and ball and start the countdown
function classicPongReset(game)
{
	game.state = 'countdown';
	game.countdown = 3;

	game.paddle1.y = canvas.height / 2 - game.paddle1.height / 2;
	game.paddle2.y = canvas.height / 2 - game.paddle2.height / 2;

	game.ball.x = canvas.width / 2;
	game.ball.y = canvas.height / 2;
	game.ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
	game.ball.dy = -4;

	game.ai.hitCount = 0;
	game.ai.previousPos = null;
	game.ai.distanceForBall = null;

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

// At the end, clear the AI interval and remove the event listeners
function endGame(game)
{
	console.log("==GAME END==");
	if (game.ai.interval)
	{
		clearInterval(game.ai.interval);
		game.ai.interval = null;
	}

	game.eventListeners.forEach(({ type, listener }) => {
		document.removeEventListener(type, listener);
	});

	game.eventListeners = [];

	game.state = 'stopped';
	currentGameInstance = null;
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

// Draw a paddle (a rectangle)
function drawPaddle(paddle)
{
	ctx.fillStyle = BLACK;
	ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw the ball (a circle)
function drawBall(ball)
{
	ctx.fillStyle = BLACK;
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);

	ctx.fill();
	ctx.closePath();	
}

/******************************* COLLISIONS *********************************/
// Wall collisions
function detectWallCollision(ball)
{
	if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0)
		ball.dy *= -1;
}

// Paddle collisions
function detectPaddleCollision(game, paddle)
{
	if (game.ball.x - game.ball.radius <= paddle.x + paddle.width
		&& game.ball.x + game.ball.radius >= paddle.x
		&& game.ball.y + game.ball.radius >= paddle.y
		&& game.ball.y - game.ball.radius <= paddle.y + paddle.height)
	{
		game.ball.dx *= -1.03;
		if (Math.abs(game.ball.dx) > 10)
			game.ball.dx = 10 * game.ball.dx / Math.abs(game.ball.dx);

		if (game.ball.dx < 0 && aiDifficulty > 0)
			game.ai.hitCount++;
	}
}

/******************************** MOVEMENTS *********************************/
// Paddle movements
function movePaddle(paddle)
{
	paddle.y += paddle.dy;
	if (paddle.y <= 2)
		paddle.y = 2;
	if (paddle.y + paddle.height >= canvas.height - 2)
		paddle.y = canvas.height - 2 - paddle.height;
}

// Ball movements
function moveBall(game)
{
	game.ball.x += game.ball.dx;
	game.ball.y += game.ball.dy;

	detectWallCollision(game.ball);

	if (game.ball.x - game.ball.radius < 0)
	{
		let player2Score = parseInt(document.getElementById('player2Score').textContent);
		player2Score++;
		setScore(2, player2Score);
		if (player2Score >= MAX_SCORE)
		{
			sendScoreUpdate('loose');
			setScore(0, 0);
			game.state = 'end2';
			return;
		}
		classicPongReset(game);
	}
	else if (game.ball.x + game.ball.radius > canvas.width)
	{
		let player1Score = parseInt(document.getElementById('player1Score').textContent);
		player1Score++;
		setScore(1, player1Score);
		if (player1Score >= MAX_SCORE)
		{
			sendScoreUpdate('win');
			setScore(0, 0);
			game.state = 'end1';
			return;
		}
		classicPongReset(game);
	}
}


/************************************ AI ************************************/
// Once every second, AI can see the ball and tries to predict its future position
function aiDecision(game)
{
	if (game.ai.framesCount !== 0)
		game.framesPerSecond = game.ai.framesCount;
	game.ai.framesCount = 0;

	if (game.state !== 'playing' && game.state !== 'countdown')
		return;

	// Current and previous ball's position on Y axis
	const currentPos = game.ball.y;
	const prevPos = (game.ai.previousPos === null) ? null : Math.abs(game.ai.previousPos);
	
	if (prevPos !== null)
	{
		// Case 1: No bounce | Case 2: Bounce on top wall | Case 3: Bounce on bottom wall
		if ((game.ball.dy > 0 && game.ai.previousPos > 0) || (game.ball.dy < 0 && game.ai.previousPos < 0))
			game.ai.distanceForBall = Math.abs(currentPos - prevPos);
		else if ((game.ball.dy > 0 && game.ai.previousPos < 0))
			game.ai.distanceForBall = currentPos + prevPos - 2 * game.ball.radius;
		else if (game.ball.dy < 0 && game.ai.previousPos > 0)
			game.ai.distanceForBall = (canvas.height - currentPos) + (canvas.height - prevPos) - 2 * game.ball.radius;

		const rand = Math.random();
		let rand2 = Math.random();
		if (aiDifficulty === 1)
			rand2 *= 10;
		else if (aiDifficulty === 2)
			rand2 *= 5;

		if (rand > 0.5)
			game.ai.distanceForBall += 1.5 * game.ai.hitCount * rand2;
		else
			game.ai.distanceForBall -= 1.5 * game.ai.hitCount * rand2;
	}
	
	game.ai.previousPos = currentPos * game.ball.dy / Math.abs(game.ball.dy);
}

// AI movements
function simulateAIInput(game)
{
	if (aiDifficulty > 0 && ((game.ball.x >= canvas.width / 2 && game.ball.dx > 0)
		|| (game.ball.x >= 3 * canvas.width / 4 && game.ball.dx < 0)))
	{
		const paddleCenter = game.paddle2.y + game.paddle2.height / 2;
		const targetPos = calculateBallPositionAtFrame(game);

		const rand = Math.round(Math.random() * 100);
		let rand2 = Math.round(0.05 * game.ai.hitCount * (1 + Math.random() / 2) * 100);

		if (aiDifficulty === 1)
			rand2 *= 4;
		else if (aiDifficulty === 2)
			rand2 *= 2;
		
		if (rand > rand2)
		{
			if (paddleCenter < targetPos)
				game.paddle2.dy = 8;
			else if (paddleCenter > targetPos)
				game.paddle2.dy = -8;
			if (Math.random() < 0.7 && Math.abs(paddleCenter - targetPos) <= PADDLE_HEIGHT / 4)
				game.paddle2.dy = 0;
		}
		else
			game.paddle2.dy = 0;
	}

	game.ai.framesCount++;
	if (game.ai.framesCount > game.framesPerSecond)
		game.framesPerSecond = game.ai.framesCount;
}

// Calculate the current ball position at the current frame
function calculateBallPositionAtFrame(game)
{
	const framesPassed = game.ai.framesCount;
	const prevPos = Math.abs(game.ai.previousPos);

	if (game.framesPerSecond === 0 || prevPos === 0)
		return (null);

	const distancePerFrame = game.ai.distanceForBall / game.framesPerSecond;
	const distanceDone = Math.round(distancePerFrame * framesPassed);
	const direction = game.ai.previousPos / prevPos;
	let ballPosition;

	if (direction < 0)
	{
		if (distanceDone > prevPos - BALL_RADIUS)
			ballPosition = Math.round(distanceDone - prevPos + 2 * BALL_RADIUS);
		else
			ballPosition = Math.round(prevPos - distanceDone);
	}
	else
	{
		if (distanceDone > canvas.height - prevPos - BALL_RADIUS)
			ballPosition = Math.round(canvas.height - distanceDone + canvas.height - prevPos - 2 * BALL_RADIUS);
		else
			ballPosition = Math.round(prevPos + distanceDone);
	}

	return (ballPosition);
}



/****************************** EVENTS HANDLER ******************************/
// When a key is pressed
function handleKeyDown(e, game)
{
	// Prevent the default behaviour of ArrowUp and ArrowDown
	if (["ArrowUp", "ArrowDown"].includes(e.key))
		e.preventDefault();

	switch (e.key)
	{
		case 'w':
		case 'z':
			game.paddle1.dy = -8;
			break;
		case 's':
			game.paddle1.dy = 8;
			break;
		case 'ArrowUp':
			if (aiDifficulty > 0)
				game.paddle1.dy = -8;
			else
				game.paddle2.dy = -8;
			break;
		case 'ArrowDown':
			if (aiDifficulty > 0)
				game.paddle1.dy = 8;
			else
				game.paddle2.dy = 8;
			break;
	}
}

// When a key is released
function handleKeyUp(e, game)
{
	// Prevent the default behaviour of ArrowUp and ArrowDown
	if (["ArrowUp", "ArrowDown"].includes(e.key))
		e.preventDefault();
	
	switch (e.key)
	{
		case 'w':
		case 'z':
		case 's':
			game.paddle1.dy = 0;
			break;
		case 'ArrowUp':
		case 'ArrowDown':
			if (aiDifficulty > 0)
				game.paddle1.dy = 0;
			else
				game.paddle2.dy = 0;
			break;
	}
}

/******************************** MAIN LOOP *********************************/
function classicPongLoop(game)
{

	if (game.state === 'stopped')
	{
		console.log('Game loop stopped.');
		return;
	}

	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	switch (game.state)
	{
		case 'playing':
			simulateAIInput(game);
			// Move and draw paddles
			movePaddle(game.paddle1);
			movePaddle(game.paddle2);
			drawPaddle(game.paddle1);
			drawPaddle(game.paddle2);
		
			// Move and draw ball
			moveBall(game);
			drawBall(game.ball);
		
			// Detect paddles' collisions
			detectPaddleCollision(game, game.paddle1);
			detectPaddleCollision(game, game.paddle2);
			break;
		case 'countdown':
			drawCountdown(game);
			break;
		case 'end1':
			document.getElementById('classicWinMessage').textContent = `${document.getElementById('player1Label').textContent} won!`;
			closeSocketConnection();
			endGame(game);
			switchScreen('classicEndScreen');
			return;
		case 'end2':
			document.getElementById('classicWinMessage').textContent = `${document.getElementById('player2Label').textContent} won!`;
			closeSocketConnection();
			endGame(game);
			switchScreen('classicEndScreen');
			return;
	}

	// Call this function recursively each frame
	requestAnimationFrame(() => classicPongLoop(game));
}

function classicPongGame()
{
	const paddle1 = {
		x: BALL_RADIUS / 4,
		y: canvas.height / 2 - PADDLE_HEIGHT / 2,
		width: PADDLE_WIDTH,
		height: PADDLE_HEIGHT,
		dy: 0
	};

	const paddle2 = {
		x: canvas.width - PADDLE_WIDTH - BALL_RADIUS / 4,
		y: canvas.height / 2 - PADDLE_HEIGHT / 2,
		width: PADDLE_WIDTH,
		height: PADDLE_HEIGHT,
		dy: 0
	};

	const ball = {
		x: canvas.width / 2,
		y: canvas.height / 2,
		dx: 4 * (Math.random() > 0.5 ? 1 : -1),
		dy: -4,
		radius: BALL_RADIUS
	};

	const ai = {
		framesCount: 0,
		interval: null,
		hitCount: 0,
		previousPos: null,
		distanceForBall: null
	}

	const game = {
		state: 'countdown',
		countdown: 3,
		eventListeners: [],
		framesPerSecond: 60,
		paddle1: paddle1,
		paddle2: paddle2,
		ball: ball,
		ai: ai
	};

	if (currentGameInstance)
	{
		console.log('Ending previous game instance...')
		endGame(currentGameInstance);
	}
	currentGameInstance = game;

	console.log("==GAME LAUNCH==");
	chatConnection();

	// Add event listeners for player controls and store them in the game object
	const keydownListener = (e) => handleKeyDown(e, game);
	const keyupListener = (e) => handleKeyUp(e, game);

	document.addEventListener('keydown', keydownListener);
	document.addEventListener('keyup', keyupListener);

	game.eventListeners.push({ type: 'keydown', listener: keydownListener });
	game.eventListeners.push({ type: 'keyup', listener: keyupListener });

	// If Player vs AI mode, set a 1 second interval for IA to make decisions
	if (aiDifficulty > 0)
		game.ai.interval = setInterval(() => aiDecision(game), 1000);

	// Reset all positions and launch the main loop of the game
	classicPongFullReset(game);
	classicPongLoop(game);
}

