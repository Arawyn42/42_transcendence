/*********************************** MENU ***********************************/
// Button 'profile'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('profile').addEventListener('click', showProfile);
});

// Button 'Play Classic'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('playClassic').addEventListener('click', function ()
	{
		gameMode = 'classic';
		saveGameMode();
		switchScreen('modeSelectionScreen');
		console.log('Selecting a game mode for classic Pong');
	});
});

// Button 'Play Multiplayer'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('playMultiplayer').addEventListener('click', function ()
	{
		gameMode = 'multi';
		saveGameMode();
		switchScreen('multiModeSelectionScreen');
		console.log('Selecting a game mode for multiplayer Pong');
	});
});

// Button 'Log out'
document.getElementById('logoutButton').addEventListener('click', function() {
	localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');
	switchScreen('loginScreen');
	console.log('Disconnection successful, token deleted');
});

// Button 'Login'
document.getElementById('loginFromMenu').addEventListener('click', function() {
	switchScreen('loginScreen');
	console.log('Déconnexion réussie, tokens supprimés');
});

// Button 'Chat'
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('chat').addEventListener('click', showChat);
});

// Function to display the right buttons if user is connected or not
function displayMenuButtons()
{
	if (USERNAME === null)
	{
		document.getElementById('profile').style.display = 'none';
		document.getElementById('logoutButton').style.display = 'none';
		document.getElementById('loginFromMenu').style.display = 'block';
	}
	else
	{
		document.getElementById('profile').style.display = 'block';
		document.getElementById('logoutButton').style.display = 'block';
		document.getElementById('loginFromMenu').style.display = 'none';
	}
}