// Button 'Play Classic'
document.getElementById('playClassic').addEventListener('click', function ()
{
	nbPlayers = 2;
	switchScreen('playerNamesScreen');
	console.log('Requesting players nicknames');
});

// Button 'Play Multiplayer'
document.getElementById('playMultiplayer').addEventListener('click', function ()
{
	switchScreen('gameScreen');
	console.log('Launching a multiplayer pong game');
});

// Button 'Play Remote'
document.getElementById('playRemote').addEventListener('click', function ()
{
	nbPlayers = 1;
	switchScreen('gameScreen');
	classicPongGame();
	console.log('Launching a game in remote');
});

//user management

// Button 'login'
document.getElementById('login').addEventListener('click', function ()
{
	switchScreen('loginScreen');
	console.log('Go to login');
});

// Button 'register'
document.getElementById('register').addEventListener('click', function ()
{
	switchScreen('registerScreen');
	console.log('Go to register');
});

// Button 'profile'
document.getElementById('profile').addEventListener('click', showProfile);

// Button 'menu'
document.getElementById('menu').addEventListener('click', function ()
{
	switchScreen('menuScreen');
	console.log('Go to menu');
});