function drawMenu()
{
	addClickEvent('menu');

	// Button 'Play classic'
	const classicPong =
	{
		text: 'Play classic',
		width: MENU_BUTTON_WIDTH,
		height: MENU_BUTTON_HEIGHT,
		x: (canvas.width - MENU_BUTTON_WIDTH) / 2,
		y: TITLE_POS_Y + 50
	};

	// Display main canvas
	ctx.fillStyle = BLACK;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Display header
	ctx.font = `${TITLE_SIZE}px "Press Start 2P", cursive`;
	ctx.fillStyle = WHITE;
	const menuHeader = 'PONG';
	ctx.fillText(menuHeader, (canvas.width - ctx.measureText(menuHeader).width) / 2, TITLE_POS_Y);

	// Display button
	ctx.fillStyle = WHITE;
	ctx.fillRect(classicPong.x, classicPong.y, classicPong.width, classicPong.height);

	// Display button text
	ctx.fillStyle = BLACK;
	ctx.font = `${BUTTON_TEXT_SIZE}px "Press Start 2P", cursive`;
	ctx.fillText(classicPong.text, classicPong.x + (classicPong.width - ctx.measureText(classicPong.text).width) / 2,
		classicPong.y + classicPong.height / 2 + BUTTON_TEXT_SIZE / 2);
}

function handleMenuClick(x, y)
{
	const classicPong =
	{
		width: MENU_BUTTON_WIDTH,
		height: MENU_BUTTON_HEIGHT,
		x: (canvas.width - MENU_BUTTON_WIDTH) / 2,
		y: TITLE_POS_Y + 40
	};

	if (x >= classicPong.x && x <= classicPong.x + classicPong.width &&
		y >= classicPong.y && y <= classicPong.y + classicPong.height)
		launchScene('classic');
}
