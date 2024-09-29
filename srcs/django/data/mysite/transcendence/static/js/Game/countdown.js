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

// Start the countdown, then change the game state
function startCountdown(game)
{
	console.log(`----- Starting countdown! -----`);
	
	const countdownInterval = setInterval(() =>
	{
		console.log(`----- ${game.countdown}... -----`);
		game.countdown--;
		if (game.countdown < 0)
		{
			clearInterval(countdownInterval);
			game.state = 'playing';
			console.log(`----- GO! -----`);
			game.ai2.time = -1;
			game.ai2.framesCount = 0;
			game.ai3.time = -1;
			game.ai3.framesCount = 0;
			game.ai4.time = -1;
			game.ai4.framesCount = 0;
		}
	}, 1000);
}