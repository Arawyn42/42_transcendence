/********************************* DRAWING **********************************/
// Display the Menu
function drawMenu()
{
	// Button 'New Game'
	const classicPong =
	{
		text: 'Play classic',
		width: MENU_BUTTON_WIDTH,
		height: MENU_BUTTON_HEIGHT,
		x: (canvas.width - MENU_BUTTON_WIDTH) / 2,
		y: canvas.height / 2
	};

	// Display main canvas
	ctx.fillStyle = '#222';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Display header
	ctx.font = '48px Arial';
	ctx.fillStyle = '#fff';
	const menuHeader = 'PONG';
	ctx.fillText(menuHeader, (canvas.width - ctx.measureText(menuHeader).width) / 2, canvas.height / 3);

	// Display button
	ctx.fillStyle = '#fff';
	ctx.fillRect(classicPong.x, classicPong.y, classicPong.width, classicPong.height);

	// Display button text
	ctx.fillStyle = '#000';
	ctx.font = '24px Arial';
	ctx.fillText(classicPong.text, classicPong.x + (classicPong.width - ctx.measureText(classicPong.text).width) / 2,
				classicPong.y + (classicPong.height / 2) + 8);
}

/****************************** EVENTS HANDLER ******************************/
// Handle menu clicks
function handleMenuClick(x, y)
{
	// Button 'Play classic'
	const classicPong =
	{
		width: MENU_BUTTON_WIDTH,
		height: MENU_BUTTON_HEIGHT,
		x: (canvas.width - MENU_BUTTON_WIDTH) / 2,
		y: canvas.height / 2
	};

	if (x >= classicPong.x && x <= classicPong.x + classicPong.width
		&& y >= classicPong.y && y <= classicPong.y + classicPong.height)
		launchScene('classic');
}
