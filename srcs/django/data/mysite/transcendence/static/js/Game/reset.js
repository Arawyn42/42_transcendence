/******************************** RESET GAME ********************************/
// Full reset
function fullResetGame(game)
{
	// Set right settings according to the game mode
	switch (gameMode)
	{
		case 'classic':
			document.getElementById('gameScreen').classList.add('classic-mode');
			setScore(0, 0);				// Set all scores on 0
			game.paddle3.alive = false;	// Enable paddle3
			game.paddle4.alive = false;	// Enable paddle4
			break;
		case 'multi':
			document.getElementById('gameScreen').classList.remove('classic-mode');
			setScore(0, MAX_SCORE);		// Set all scores on max score
			game.paddle3.alive = true;	// Enable paddle3
			game.paddle4.alive = true;	// Enable paddle4
			break;
		default:
			console.error(`Wrong game mode value`);
			break;
	}

	// Enable paddle1 and paddle2
	game.paddle1.alive = true;
	game.paddle2.alive = true;

	// Set which AIs are active
	activateAI(game);

	// Reset game objects
	resetGame(game);
}

// Reset paddles and ball and start the countdown
function resetGame(game)
{
	// Reset countdown
	game.state = 'countdown';
	game.countdown = 3;

	// Reset paddles positions
	game.paddle1.y = canvas.height / 2 - game.paddle1.height / 2;
	game.paddle2.y = canvas.height / 2 - game.paddle2.height / 2;
	game.paddle3.x = canvas.width / 2 - game.paddle3.width / 2;
	game.paddle4.x = canvas.width / 2 - game.paddle4.width / 2;

	// Reset ball position and direction
	game.ball.x = canvas.width / 2;
	game.ball.y = canvas.height / 2;
	game.ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
	game.ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);

	// Reset AI 2
	game.ai2.hitCount = 0;
	game.ai2.previousPos = null;
	game.ai2.distanceForBall = null;

	// Reset AI 3
	game.ai3.hitCount = 0;
	game.ai3.previousPos = null;
	game.ai3.distanceForBall = null;

	// Reset AI 4
	game.ai4.hitCount = 0;
	game.ai4.previousPos = null;
	game.ai4.distanceForBall = null;

	// Starts the countdown (3, 2, 1... GO)
	startCountdown(game);
}

/********************************* END GAME *********************************/
// At the end, clear the AI interval and remove the event listeners
function endGame(game)
{
	console.log("==GAME END==");

	if (game.ai2.interval)
	{
		clearInterval(game.ai2.interval);
		game.ai2.interval = null;
	}
	if (game.ai3.interval)
	{
		clearInterval(game.ai3.interval);
		game.ai3.interval = null;
	}
	if (game.ai4.interval)
	{
		clearInterval(game.ai4.interval);
		game.ai4.interval = null;
	}

	game.eventListeners.forEach(({ type, listener }) => {
		document.removeEventListener(type, listener);
	});

	game.eventListeners = [];

	game.state = 'stopped';
	currentGameInstance = null;
}
