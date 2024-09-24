/****************************** EVENTS HANDLER ******************************/
// When a key is pressed
function handleKeyDown(e, game)
{
	// Prevent the default behaviour of ArrowUp and ArrowDown
	if (["ArrowUp", "ArrowDown"].includes(e.key))
		e.preventDefault();

	switch (e.key)
	{
		// Player 1 controls
		case 'w':
		case 'z':
			game.paddle1.dy = -8;
			break;
		case 's':
			game.paddle1.dy = 8;
			break;
		
		// Player 2 controls
		case 'ArrowUp':
			if (nbPlayers >= 2)
				game.paddle2.dy = -8;
			break;
		case 'ArrowDown':
			if (nbPlayers >= 2)
				game.paddle2.dy = 8;
			break;
		
		// Player 3 controls
		case 'j':
			if (nbPlayers >= 3)
				game.paddle3.dx = -8;
			break;
		case 'l':
			if (nbPlayers >= 3)
				game.paddle3.dx = 8;
			break;
		
		// Player 4 controls
		case '1':
			if (nbPlayers === 4)
				game.paddle3.dx = -8;
			break;
		case '3':
			if (nbPlayers === 4)
				game.paddle3.dx = 8;
			break;
	}
}

// When a key is released
function handleKeyUp(e, game)
{
	// Prevent the default behaviour of ArrowUp and ArrowDown
	if (["ArrowUp", "ArrowDown"].includes(e.key))
		e.preventDefault();
	
	switch (e.key)
	{
		// Player 1 released
		case 'w':
		case 'z':
		case 's':
			game.paddle1.dy = 0;
			break;
		
		// Player 2 released
		case 'ArrowUp':
		case 'ArrowDown':
			if (nbPlayers >= 2)
				game.paddle2.dy = 0;
			break;
		
		// Player 3 released
		case 'j':
		case 'l':
			if (nbPlayers >= 3)
				game.paddle3.dx = 0;
			break;
		
		// Player 4 released
		case '1':
		case '3':
			if (nbPlayers >= 4)
				game.paddle4.dx = 0;
			break;
	}
}