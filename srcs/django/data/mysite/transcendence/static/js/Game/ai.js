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
