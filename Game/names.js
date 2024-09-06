// Button 'Start Game' (Start the game with the players input names)
document.getElementById('startGameWithNames').addEventListener('click', function ()
{
	const player1Name = document.getElementById('player1Input').value.trim();
	const player2Name = document.getElementById('player2Input').value.trim();

	let isValid = true;

	// Reset error messages
    document.getElementById('player1InputError').textContent = '';
    document.getElementById('player2InputError').textContent = '';

    // Validate Player 1 Name
    if (player1Name.length < 2)
	{
        document.getElementById('player1InputError').textContent = 'Enter at least 2 characters';
        isValid = false;
    }

    // Validate Player 2 Name
    if (player2Name.length < 2)
	{
        document.getElementById('player2InputError').textContent = 'Enter at least 2 characters';
        isValid = false;
    }

    // If names are valid, start the game
    if (isValid)
	{
        document.getElementById('player1Label').textContent = player1Name;
        document.getElementById('player2Label').textContent = player2Name;

        switchScreen('gameScreen');
        classicPongGame();
        console.log(`Starting the game with player names: ${player1Name}, ${player2Name}`);
    }
});
