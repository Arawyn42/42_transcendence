/******************************** MAIN LOOP *********************************/
function gameLoop(game)
{
	// Stop the loop if the game was stopped
	if (game.state === 'stopped')
	{
		console.log('Game loop stopped.');
		return;
	}

	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Count frames for AIs
	countFrames(game);

	switch (game.state)
	{
		case 'playing':
			// Move active AIs
			moveActiveAIs(game);

			// Move and draw paddles
			moveAllPaddles(game);
			drawAllPaddles(game);
		
			// Move and draw ball
			moveBall(game);

			// Detect collisions
			detectCollisions(game);

			// Draw ball
			drawBall(game.ball);

			break;
		case 'countdown':
			drawCountdown(game);
			break;
		case 'end1':
			setWinner(1);
			endGame(game);
			switchScreen('endScreen');
			return;
		case 'end2':
			setWinner(2);
			endGame(game);
			switchScreen('endScreen');
			return;
		case 'end3':
			setWinner(3);
			endGame(game);
			switchScreen('endScreen');
			return;
		case 'end4':
			setWinner(4);
			endGame(game);
			switchScreen('endScreen');
			return;
	}

	// Call this function recursively each frame
	requestAnimationFrame(() => gameLoop(game));
}

/******************************* LAUNCH GAME ********************************/
function launchGame()
{
	if (nbPlayers < 1 || nbPlayers > 4)
	{
		console.log(`Can't launch the game: Wrong parameters`);
		switchScreen('menuScreen');
		if (currentGameInstance)
		{
			console.log('Ending previous game instance...')
			endGame(currentGameInstance);
		}
		return;
	}

	const paddle1 = {
		x: BALL_RADIUS / 4,
		y: canvas.height / 2 - PADDLE_HEIGHT / 2,
		width: PADDLE_WIDTH,
		height: PADDLE_HEIGHT,
		dy: 0,
		alive: true
	};

	const paddle2 = {
		x: canvas.width - PADDLE_WIDTH - BALL_RADIUS / 4,
		y: canvas.height / 2 - PADDLE_HEIGHT / 2,
		width: PADDLE_WIDTH,
		height: PADDLE_HEIGHT,
		dy: 0,
		alive: true
	};

	const paddle3 = {
		x: canvas.width / 2 - PADDLE_WIDTH / 2,
		y: BALL_RADIUS / 4,
		width: PADDLE_HEIGHT,
		height: PADDLE_WIDTH,
		dx: 0,
		alive: true
	};

	const paddle4 = {
		x: canvas.width / 2 - PADDLE_WIDTH / 2,
		y: canvas.height - PADDLE_WIDTH - BALL_RADIUS / 4,
		width: PADDLE_HEIGHT,
		height: PADDLE_WIDTH,
		dx: 0,
		alive: true
	};

	const ball = {
		x: canvas.width / 2,
		y: canvas.height / 2,
		dx: 4 * (Math.random() > 0.5 ? 1 : -1),
		dy: 4 * (Math.random() > 0.5 ? 1 : -1),
		radius: BALL_RADIUS
	};

	const ai2 = {
		time: -1,
		framesCount: 0,
		fps: 60,
		interval: null,
		hitCount: 0,
		previousPos: null,
		distanceForBall: null,
		active: false
	}

	const ai3 = {
		time: -1,
		framesCount: 0,
		fps: 60,
		interval: null,
		hitCount: 0,
		previousPos: null,
		distanceForBall: null,
		active: false
	}

	const ai4 = {
		time: -1,
		framesCount: 0,
		fps: 60,
		interval: null,
		hitCount: 0,
		previousPos: null,
		distanceForBall: null,
		active: false
	}

	const game = {
		state: 'countdown',
		countdown: 3,
		eventListeners: [],
		paddle1: paddle1,
		paddle2: paddle2,
		paddle3: paddle3,
		paddle4: paddle4,
		ball: ball,
		ai2: ai2,
		ai3: ai3,
		ai4: ai4
	};

	if (currentGameInstance)
	{
		console.log('Ending previous game instance...')
		endGame(currentGameInstance);
	}
	currentGameInstance = game;

	console.log("==GAME LAUNCH==");

	// Add event listeners for player controls and store them in the game object
	const keydownListener = (e) => handleKeyDown(e, game);
	const keyupListener = (e) => handleKeyUp(e, game);

	document.addEventListener('keydown', keydownListener);
	document.addEventListener('keyup', keyupListener);

	game.eventListeners.push({ type: 'keydown', listener: keydownListener });
	game.eventListeners.push({ type: 'keyup', listener: keyupListener });

	// If AI enabled, set an interval every second
	setAIIntervals(game);

	// Full reset the game and launch the game loop
	fullResetGame(game)
	gameLoop(game);
}