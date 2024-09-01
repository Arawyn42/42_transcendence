function drawEndScreen(player)
{
	addClickEvent('end');

	const buttonX = (canvas.width - MENU_BUTTON_WIDTH) / 2;
	const buttonY = canvas.height / 2;

	// Display background
	ctx.fillStyle = BLACK;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Display Win text
	ctx.font = `${TITLE_SIZE}px "Press Start 2P", cursive`;
	ctx.fillStyle = GREEN;
	const winnerText = player == 1 ? 'Player 1 won!' : 'Player 2 won!';
	ctx.fillText(winnerText, (canvas.width - ctx.measureText(winnerText).width) / 2,
				canvas.height / 3 + SUBTITLE_SIZE / 2);

	// Display buttons
	ctx.fillStyle = WHITE;
	ctx.fillRect(buttonX, buttonY, MENU_BUTTON_WIDTH, MENU_BUTTON_HEIGHT);
	ctx.fillRect(buttonX, buttonY + MENU_BUTTON_HEIGHT + 20, MENU_BUTTON_WIDTH, MENU_BUTTON_HEIGHT);

	ctx.fillStyle = BLACK;
	ctx.font = `${BUTTON_TEXT_SIZE}px "Press Start 2P", cursive`;
	ctx.fillText('New Game', buttonX + (MENU_BUTTON_WIDTH - ctx.measureText('New Game').width) / 2,
				buttonY + MENU_BUTTON_HEIGHT / 2 + BUTTON_TEXT_SIZE / 2);
	ctx.fillText('Main Menu', buttonX + (MENU_BUTTON_WIDTH - ctx.measureText('Main Menu').width) / 2,
				buttonY + MENU_BUTTON_HEIGHT + 20 + MENU_BUTTON_HEIGHT / 2 + BUTTON_TEXT_SIZE / 2);
}

function handleEndScreenClick(x, y)
{
	const buttonX = (canvas.width - MENU_BUTTON_WIDTH) / 2;
	const buttonY = canvas.height / 2;

	if (x >= buttonX && x <= buttonX + MENU_BUTTON_WIDTH)
	{
		if (y >= buttonY && y <= buttonY + MENU_BUTTON_HEIGHT)
		{
			removeClickEvents();
			launchScene('classic');
		}
		else if (y >= buttonY + MENU_BUTTON_HEIGHT + 20 && y <= buttonY + 2 * MENU_BUTTON_HEIGHT + 20)
			launchScene('menu');
	}
}
