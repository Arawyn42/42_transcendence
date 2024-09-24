/******************************** MAIN LOOP *********************************/
function gameLoop(game)
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
			// Move AI if it's enabled
			simulateAIInput(game);

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
		case 'end3':
			document.getElementById('classicWinMessage').textContent = `${document.getElementById('player3Label').textContent} won!`;
			closeSocketConnection();
			endGame(game);
			switchScreen('classicEndScreen');
			return;
		case 'end4':
			document.getElementById('classicWinMessage').textContent = `${document.getElementById('player4Label').textContent} won!`;
			closeSocketConnection();
			endGame(game);
			switchScreen('classicEndScreen');
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
		dy: 0
	};

	const paddle2 = {
		x: canvas.width - PADDLE_WIDTH - BALL_RADIUS / 4,
		y: canvas.height / 2 - PADDLE_HEIGHT / 2,
		width: PADDLE_WIDTH,
		height: PADDLE_HEIGHT,
		dy: 0
	};

	const paddle3 = {
		x: canvas.width / 2 - PADDLE_WIDTH / 2,
		y: BALL_RADIUS / 4,
		width: PADDLE_HEIGHT,
		height: PADDLE_WIDTH,
		dx: 0
	};

	const paddle4 = {
		x: canvas.width / 2 - PADDLE_WIDTH / 2,
		y: canvas.height - PADDLE_WIDTH - BALL_RADIUS / 4,
		width: PADDLE_HEIGHT,
		height: PADDLE_WIDTH,
		dx: 0
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
		paddle3: paddle3,
		paddle4: paddle4,
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

	// Full reset the game and launch the game loop
	fullResetGame(game)
	gameLoop(game);
}