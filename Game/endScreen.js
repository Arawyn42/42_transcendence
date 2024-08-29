// Display the end screen
function drawEndScreen(player)
{
	const buttonX = (canvas.width - MENU_BUTTON_WIDTH) / 2;
	const buttonY = canvas.height / 2;

	// Display background
	ctx.fillStyle = '#222';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Display Win text
	ctx.font = '48px Arial';
	ctx.fillStyle = '#fff';
	const winnerText = player == 1 ? 'Player 1 won!' : 'Player 2 won!';
	const winnerTextWidth = ctx.measureText(winnerText).width;
	ctx.fillText(winnerText, (canvas.width - winnerTextWidth) / 2, canvas.height / 3);

	// Display 'New Game' button
	ctx.fillStyle = '#fff';
	ctx.fillRect(buttonX, buttonY, MENU_BUTTON_WIDTH, MENU_BUTTON_HEIGHT);

	// Display 'New Game' text
	ctx.fillStyle = '#000';
	ctx.font = '24px Arial';
	ctx.fillText('New Game', buttonX + (MENU_BUTTON_WIDTH - ctx.measureText('New Game').width) / 2,
			buttonY + (MENU_BUTTON_HEIGHT / 2) + 8);

	const button2Y = buttonY + MENU_BUTTON_HEIGHT + 20;

	// Display 'Main Menu' button
	ctx.fillStyle = '#fff';
	ctx.fillRect(buttonX, button2Y, MENU_BUTTON_WIDTH, MENU_BUTTON_HEIGHT);

	// Display 'Main Menu' text
	ctx.fillStyle = '#000';
	ctx.fillText('Main Menu', buttonX + (MENU_BUTTON_WIDTH - ctx.measureText('Main Menu').width) / 2,
			button2Y + (MENU_BUTTON_HEIGHT / 2) + 8);
}

// Handle end screen clicks
function handleEndScreenClick(x, y)
{
	const buttonX = (canvas.width - MENU_BUTTON_WIDTH) / 2;
	const buttonY = canvas.height / 2;

	const button2Y = buttonY + MENU_BUTTON_HEIGHT + 20;

	if (x >= buttonX && x <= buttonX + MENU_BUTTON_WIDTH && y >= buttonY && y <= buttonY + MENU_BUTTON_HEIGHT)
		launchScene('classic');
	else if (x >= buttonX && x <= buttonX + MENU_BUTTON_WIDTH && y >= button2Y && y <= button2Y + MENU_BUTTON_HEIGHT)
		launchScene('menu');
}
