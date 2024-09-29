/************************************ AI ************************************/
// Activate the AIs according to the number of real players
function activateAI(game)
{
	switch (gameMode)
	{
		case 'classic':
			if (nbPlayers === 1)
				setAI2(game, true);
			else
				setAI2(game, false);
			game.ai3.active = false;
			game.ai4.active = false;
			break;
		case 'multi':
			if (nbPlayers === 1)
			{
				setAI2(game, true);
				setAI3(game, true);
				setAI4(game, true);
			}
			else if (nbPlayers === 2)
			{
				setAI2(game, false);
				setAI3(game, true);
				setAI4(game, true);
			}
			else if (nbPlayers === 3)
			{
				setAI2(game, false);
				setAI3(game, false);
				setAI4(game, true);
			}
			else if (nbPlayers === 4)
			{
				setAI2(game, false);
				setAI3(game, false);
				setAI4(game, false);
			}
			break;
	}
}

// Enable or disabled AI 2 and display controls for player if disabled
function setAI2(game, enable)
{
	if (enable)
	{
		game.ai2.active = true;
		document.getElementById('rightControls').style.display = 'none';
	}
	else
	{
		game.ai2.active = false;
		document.getElementById('rightControls').style.display = 'flex';
	}
}

// Enable or disabled AI 3 and display controls for player if disabled
function setAI3(game, enable)
{
	if (enable)
	{
		game.ai3.active = true;
		document.getElementById('player3ControlsLabel').style.display = 'none';
		document.getElementById('player3Key1Label').style.display = 'none';
		document.getElementById('player3Key2Label').style.display = 'none';
		document.getElementById('player3EndKeysLabel').style.display = 'none';
	}
	else
	{
		game.ai3.active = false;
		document.getElementById('player3ControlsLabel').style.display = 'flex';
		document.getElementById('player3Key1Label').style.display = 'flex';
		document.getElementById('player3Key2Label').style.display = 'flex';
		document.getElementById('player3EndKeysLabel').style.display = 'flex';
	}
}

// Enable or disabled AI 4 and display controls for player if disabled
function setAI4(game, enable)
{
	if (enable)
	{
		game.ai4.active = true;
		document.getElementById('player4ControlsLabel').style.display = 'none';
		document.getElementById('player4Key1Label').style.display = 'none';
		document.getElementById('player4Key2Label').style.display = 'none';
		document.getElementById('player4EndKeysLabel').style.display = 'none';
	}
	else
	{
		game.ai4.active = false;
		document.getElementById('player4ControlsLabel').style.display = 'flex';
		document.getElementById('player4Key1Label').style.display = 'flex';
		document.getElementById('player4Key2Label').style.display = 'flex';
		document.getElementById('player4EndKeysLabel').style.display = 'flex';
	}
}

function setAIIntervals(game)
{
	switch (gameMode)
	{
		case 'classic':
			if (nbPlayers === 1)
				game.ai2.interval = setInterval(() => AICanSeeBallPositionY(game, game.ai2), 1000);
			break;
		case 'multi':
			if (nbPlayers === 1)
			{
				game.ai2.interval = setInterval(() => AICanSeeBallPositionY(game, game.ai2), 1000);
				game.ai3.interval = setInterval(() => AICanSeeBallPositionX(game, game.ai3), 1000);
				game.ai4.interval = setInterval(() => AICanSeeBallPositionX(game, game.ai4), 1000);
			}
			else if (nbPlayers === 2)
			{
				game.ai3.interval = setInterval(() => AICanSeeBallPositionX(game, game.ai3), 1000);
				game.ai4.interval = setInterval(() => AICanSeeBallPositionX(game, game.ai4), 1000);
			}
			else if (nbPlayers === 3)
				game.ai4.interval = setInterval(() => AICanSeeBallPositionX(game, game.ai4), 1000);
			break;
	}
}

// Once every second, AI can see the ball position on X axis
// and tries to predict its future position on X axis
function AICanSeeBallPositionX(game, ai)
{
	// Count elapsed time since last reset
	ai.time++;

	// Update AI FPS (if more than 24 FPS) and reset the frames count
	if (ai.time > 0 && ai.framesCount > 0)
		ai.fps = ai.framesCount;
	ai.framesCount = 0;
	
	// if (game.state !== 'playing' && game.state != 'countdown')
	// 	return;

	// Current and previous ball's position on Y axis
	const currentPos = game.ball.x;
	const prevPos = (ai.previousPos === null) ? null : Math.abs(ai.previousPos);
	
	if (ai.time > 0 && prevPos !== null)
	{
		// Case 1: No bounce | Case 2: Bounce on left wall | Case 3: Bounce on right wall
		if ((game.ball.dx > 0 && ai.previousPos > 0)
			|| (game.ball.dx < 0 && ai.previousPos < 0))
			ai.distanceForBall = Math.abs(currentPos - prevPos);
		else if ((game.ball.dx > 0 && ai.previousPos < 0))
		{
			if (game.paddle1.alive)
				ai.distanceForBall = currentPos + prevPos
								   - 2 * (BALL_RADIUS + 2 + PADDLE_WIDTH);
			else
				ai.distanceForBall = currentPos + prevPos - 2 * BALL_RADIUS;
		}
		else if (game.ball.dx < 0 && ai.previousPos > 0)
		{
			if (game.paddle2.alive)
				ai.distanceForBall = (canvas.width - currentPos)
								   + (canvas.width - prevPos)
								   - 2 * (BALL_RADIUS + 2 + PADDLE_WIDTH);
			else
				ai.distanceForBall = (canvas.width - currentPos)
								   + (canvas.width - prevPos) - 2 * BALL_RADIUS;
		}
		
		const rand = Math.random();
		let rand2 = Math.random();
		if (aiDifficulty === 1)
			rand2 *= 10;
		else if (aiDifficulty === 2)
			rand2 *= 5;

		if (rand > 0.5)
			ai.distanceForBall += 1.25 * ai.hitCount * rand2;
		else
			ai.distanceForBall -= 1.25 * ai.hitCount * rand2;
	}
	
	if (prevPos === currentPos || !ai.distanceForBall)
		ai.distanceForBall = Math.abs(game.ball.dx) * 60;
	
	ai.previousPos = currentPos * game.ball.dx / Math.abs(game.ball.dx);
}

// Once every second, AI can see the ball position on Y axis
// and tries to predict its future position on Y axis
function AICanSeeBallPositionY(game, ai)
{
	// Count elapsed time since last reset
	ai.time++;

	// Update AI FPS (if more than 24 FPS) and reset the frames count
	if (ai.time > 0 && ai.framesCount > 0)
		ai.fps = ai.framesCount;
	ai.framesCount = 0;

	if (game.state !== 'playing' && game.state !== 'countdown')
		return;

	// Current and previous ball's position on Y axis
	const currentPos = game.ball.y;
	const prevPos = (ai.previousPos === null) ? null : Math.abs(ai.previousPos);
	
	if (ai.time > 0 && prevPos !== null)
	{
		// Case 1: No bounce | Case 2: Bounce on top wall | Case 3: Bounce on bottom wall
		if ((game.ball.dy > 0 && ai.previousPos > 0) || (game.ball.dy < 0 && ai.previousPos < 0))
			ai.distanceForBall = Math.abs(currentPos - prevPos);
		else if ((game.ball.dy > 0 && ai.previousPos < 0))
		{
			if (game.paddle3.alive)
				ai.distanceForBall = currentPos + prevPos
								   - 2 * (BALL_RADIUS + 2 + PADDLE_WIDTH);
			else
				ai.distanceForBall = currentPos + prevPos - 2 * BALL_RADIUS;
		}
		else if (game.ball.dy < 0 && ai.previousPos > 0)
		{
			if (game.paddle4.alive)
				ai.distanceForBall = (canvas.height - currentPos)
								   + (canvas.height - prevPos)
								   - 2 * (BALL_RADIUS + 2 + PADDLE_WIDTH);
			else
				ai.distanceForBall = (canvas.height - currentPos)
								   + (canvas.height - prevPos) - 2 * BALL_RADIUS;
		}

		const rand = Math.random();
		let rand2 = Math.random();
		if (aiDifficulty === 1)
			rand2 *= 10;
		else if (aiDifficulty === 2)
			rand2 *= 5;

		if (rand > 0.5)
			ai.distanceForBall += 1.5 * ai.hitCount * rand2;
		else
			ai.distanceForBall -= 1.5 * ai.hitCount * rand2;
	}
	
	if (prevPos === currentPos || !ai.distanceForBall)
		ai.distanceForBall = Math.abs(game.ball.dy) * 60;
	
	ai.previousPos = currentPos * game.ball.dy / Math.abs(game.ball.dy);
}

// Move active AIs
function moveActiveAIs(game)
{
	moveAI2(game);
	moveAI3(game);
	moveAI4(game);
}

// Count frames for AIs
function countFrames(game)
{
	game.ai2.framesCount++;
	if (game.ai2.framesCount > game.ai2.fps)
		game.ai2.fps = game.ai2.framesCount;

	game.ai3.framesCount++;
	if (game.ai3.framesCount > game.ai3.fps)
		game.ai3.fps = game.ai3.framesCount;

	game.ai4.framesCount++;
	if (game.ai4.framesCount > game.ai4.fps)
		game.ai4.fps = game.ai4.framesCount;
}

// AI 2 movements
function moveAI2(game)
{
	if (!game.ai2.active)
		return;
	
	if (((game.ball.x >= canvas.width / 2 && game.ball.dx > 0)
		|| (game.ball.x >= 3 * canvas.width / 4 && game.ball.dx < 0)))
	{
		const paddleCenter = game.paddle2.y + game.paddle2.height / 2;
		const targetPos = calculateBallPositionAtFrameY(game, game.ai2);

		const rand = Math.round(Math.random() * 100);
		let rand2 = Math.round(0.04 * game.ai2.hitCount * (1 + Math.random() / 2) * 100);

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

}

// Calculate the current ball position on Y axis at the current frame
function calculateBallPositionAtFrameY(game, ai)
{
	const framesPassed = ai.framesCount;
	const prevPos = Math.abs(ai.previousPos);

	if (ai.fps === 0)
	{
		console.error(`FPS is 0`);
		return (null);
	}

	const distancePerFrame = ai.distanceForBall / ai.fps;
	const distanceDone = Math.round(distancePerFrame * framesPassed);
	const direction = ai.previousPos / prevPos;
	let spaceLeft = BALL_RADIUS;
	let ballPosition;

	if (direction < 0)				// Ball going to the top
	{
		if (game.paddle3.alive)
			spaceLeft = BALL_RADIUS + 2 + PADDLE_WIDTH;

		if (distanceDone > prevPos - spaceLeft)
			ballPosition = Math.round(distanceDone - prevPos + 2 * spaceLeft);
		else
			ballPosition = Math.round(prevPos - distanceDone);
	}
	else							// Ball going to the bottom
	{
		if (game.paddle4.alive)
			spaceLeft = BALL_RADIUS + 2 + PADDLE_WIDTH;

		if (distanceDone > canvas.height - prevPos - spaceLeft)
			ballPosition = Math.round(canvas.height
						 - distanceDone + canvas.height - prevPos - 2 * spaceLeft);
		else
			ballPosition = Math.round(prevPos + distanceDone);
	}

	return (ballPosition);
}

// AI 3 movements
function moveAI3(game)
{
	if (!game.ai3.active)
		return;

	const paddleCenter = game.paddle3.x + PADDLE_HEIGHT / 2;
	const targetPos = calculateBallPositionAtFrameX(game, game.ai3);

	const rand = Math.round(Math.random() * 100);
	let rand2 = Math.round(0.04 * game.ai3.hitCount * (1 + Math.random() / 2) * 100);

	if (aiDifficulty === 1)
		rand2 *= 4;
	else if (aiDifficulty === 2)
		rand2 *= 2;
	
	if (rand > rand2)
	{
		if (paddleCenter < targetPos)
			game.paddle3.dx = 8;
		else if (paddleCenter > targetPos)
			game.paddle3.dx = -8;
		if (Math.random() < 0.7 && Math.abs(paddleCenter - targetPos) <= PADDLE_HEIGHT / 4)
			game.paddle3.dx = 0;
	}
	else
		game.paddle3.dx = 0;
}

// AI 4 movements
function moveAI4(game)
{
	if (!game.ai4.active)
		return;

	const paddleCenter = game.paddle4.x + PADDLE_HEIGHT / 2;
	const targetPos = calculateBallPositionAtFrameX(game, game.ai4);

	const rand = Math.round(Math.random() * 100);
	let rand2 = Math.round(0.04 * game.ai4.hitCount * (1 + Math.random() / 2) * 100);

	if (aiDifficulty === 1)
		rand2 *= 4;
	else if (aiDifficulty === 2)
		rand2 *= 2;

	if (rand > rand2)
	{
		if (paddleCenter < targetPos)
			game.paddle4.dx = 8;
		else if (paddleCenter > targetPos)
			game.paddle4.dx = -8;
		if (Math.random() < 0.7 && Math.abs(paddleCenter - targetPos) <= PADDLE_HEIGHT / 4)
			game.paddle4.dx = 0;
	}
	else
		game.paddle4.dx = 0;
}

// Calculate the current ball position on X axis at the current frame
function calculateBallPositionAtFrameX(game, ai)
{
	const framesPassed = ai.framesCount;
	const prevPos = Math.abs(ai.previousPos);

	if (ai.fps === 0)
	{
		console.error(`FPS is 0`);
		return (null);
	}

	const distancePerFrame = ai.distanceForBall / ai.fps;
	const distanceDone = distancePerFrame * framesPassed;
	const direction = ai.previousPos / prevPos;
	let spaceLeft = BALL_RADIUS;
	let ballPosition;

	if (direction < 0)			// Ball going to the left
	{
		if (game.paddle1.alive)
			spaceLeft = BALL_RADIUS + 2 + PADDLE_WIDTH;

		if (distanceDone > prevPos - spaceLeft)
			ballPosition = distanceDone - prevPos + 2 * spaceLeft;
		else
			ballPosition = prevPos - distanceDone;
	}
	else						// Ball going to the right
	{
		if (game.paddle2.alive)
			spaceLeft = BALL_RADIUS + 2 + PADDLE_WIDTH;

		if (distanceDone > canvas.width - prevPos - spaceLeft)
			ballPosition = canvas.width - distanceDone + canvas.width
						 - prevPos - 2 * spaceLeft;
		else
			ballPosition = prevPos + distanceDone;
	}

	return (ballPosition);
}
