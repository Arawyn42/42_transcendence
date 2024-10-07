/****************************** HANDLE COOKIES ******************************/
// Save a cookie at chosed key for chosed number of days
function setCookie(key, value, days) {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = key + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
}

// Return the value of a cookie at specified key
function getCookie(key) {
    const name = key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}


/******************************** SAVE DATAS ********************************/
// Save nbPlayers value
function saveNbPlayers()
{
	setCookie('nbPlayers', nbPlayers.toString(), 365);
	console.log(`nbPlayers value saved`);
}

// Return nbPlayers value
function getNbPlayers()
{
	const value = getCookie('nbPlayers');
	return (value ? parseInt(value) : null);
}

// Save gameMode value
function saveGameMode()
{
	setCookie('gameMode', gameMode, 365);
	console.log(`gameMode value saved`);
}

// Return gameMode value
function getGameMode()
{
	const value = getCookie('gameMode');
	return (value ? value : null);
}

// Save aiDifficulty value
function saveAiDifficulty()
{
	setCookie('aiDifficulty', aiDifficulty.toString(), 365);
	console.log(`aiDifficulty value saved`);
}

// Return aiDifficulty value
function getAiDifficulty()
{
	const value = getCookie('aiDifficulty');
	return (value ? parseInt(value) : null);
}

// Save tournament object if a tournament is ongoing
function saveTournament()
{
	setCookie('tournament', JSON.stringify(tournament), 365);
	console.log(`tournament object saved`);
}

// Return tournament object
function getTournament()
{
	const value = getCookie('tournament');
	return (value ? JSON.parse(value) : null);
}

// Save a player's name
function savePlayer(player)
{
	let name;

	switch (player)
	{
		case 1:
			name = document.getElementById('player1Label').textContent;
			setCookie('player1', name, 365);
			console.log(`Player1 value saved`);
			break;
		case 2:
			name = document.getElementById('player2Label').textContent;
			setCookie('player2', name, 365);
			console.log(`Player2 value saved`);
			break;
		case 3:
			name = document.getElementById('player3Label').textContent;
			setCookie('player3', name, 365);
			console.log(`Player3 value saved`);
			break;
		case 4:
			name = document.getElementById('player4Label').textContent;
			setCookie('player4', name, 365);
			console.log(`Player4 value saved`);
			break;
		default:
			break;
	}
}

// Return a player's name
function getPlayer(player)
{
	let value;
	
	switch (player)
	{
		case 1:
			value = getCookie('player1');
			return (value ? value : null);
		case 2:
			value = getCookie('player2');
			return (value ? value : null);
		case 3:
			value = getCookie('player3');
			return (value ? value : null);
		case 4:
			value = getCookie('player4');
			return (value ? value : null);
		default:
			console.error(`Can't get the name of Player ${player}`);
			return (null);
			break;
	}
}

// Save the winner's name
function saveWinner(winner)
{
	setCookie('winner', winner, 365);
	console.log(`winner value saved`);
}

// Return the winner's name
function getWinner()
{
	const value = getCookie('winner');
	return (value ? value : null);
}

// Save all datas values
function saveDatas()
{
	saveNbPlayers();
	saveGameMode();
	saveAiDifficulty();
	saveTournament();
	savePlayer(1);
	savePlayer(2);
	savePlayer(3);
	savePlayer(4);
}

// Load all datas
function loadDatas()
{
	let value;

	value = getNbPlayers();
	if (value)
		nbPlayers = value;

	value = getGameMode();
	if (value)
		gameMode = value;

	value = getAiDifficulty();
	if (value)
		aiDifficulty = value;

	value = getTournament();
	if (value)
		tournament = value;

	value = getPlayer(1);
	if (value)
		document.getElementById('player1Label').textContent = value;

	value = getPlayer(2);
	if (value)
		document.getElementById('player2Label').textContent = value;

	value = getPlayer(3);
	if (value)
		document.getElementById('player3Label').textContent = value;

	value = getPlayer(4);
	if (value)
		document.getElementById('player4Label').textContent = value;

	value = getWinner();
	if (value)
		document.getElementById('winningPlayer').innerHTML = value;
}