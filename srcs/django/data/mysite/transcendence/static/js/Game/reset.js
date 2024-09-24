/******************************** RESET GAME ********************************/
// Full reset
function fullResetGame(game)
{
	// Set right settings according to the game mode
	switch (gameMode)
	{
		case 'classic':
			setScore(0, 0);			// Set all scores on 0
			break;
		case 'multi':
			setScore(0, MAX_SCORE);	// Set all scores on max score
			break;
		default:
			console.error(`Wrong game mode value`);
			break;
	}

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
	game.ball.dy = -4;

	// Reset AI
	game.ai.hitCount = 0;
	game.ai.previousPos = null;
	game.ai.distanceForBall = null;

	// Starts the countdown (3, 2, 1... GO)
	startCountdown(game);
}

/********************************* END GAME *********************************/
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
