// noms des joueurs non affichés quand changement de langue.

/****************************** TRANSLATIONS ******************************/

function loadDefaultLanguage() {
    const savedLanguage = getLanguageCookie();
    if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage);}
	else {
        setLanguage('en');} // Default language if no cookie.
    applyTranslations();
}

// Buttons Language Selection
document.addEventListener('DOMContentLoaded', function() {
	loadDefaultLanguage();
    document.querySelectorAll('.languageButton').forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.id;
            setLanguage(lang);
			setLanguageCookie(lang);
            applyTranslations();
            console.log('Language selected: ' + lang);
        });
    });
});

function translate(key) {
	if (translations[currentLanguage] && translations[currentLanguage].hasOwnProperty(key))
		return translations[currentLanguage][key];
	else if (translations['en'] && translations['en'].hasOwnProperty(key))
		return translations['en'][key];
	else
		return key;
}


function applyTranslations()
{
	document.querySelectorAll('[textTranslated]').forEach(element => {
		const key = element.getAttribute('textTranslated');
		if (key.startsWith('dynamic'))
		{
			const originalText = element.textContent;
			const toFind = originalText.indexOf(': ');
			if (toFind !== -1)
			{
				const dynamicPart = originalText.substring(toFind + 2).trim();
				if (dynamicPart !== '') {
					element.textContent = translate(key) + ' ' + dynamicPart;}
				else {
					element.textContent = translate(key) + ' ';}
			}
		}
		else if (element.tagName === 'INPUT') {
			element.placeholder = translate(key);}
		else {
			element.textContent = translate(key);}
	});
}
  
function getLanguageCookie()
{
	const name = "userLanguage=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArray = decodedCookie.split(';');
	for (let i = 0; i < cookieArray.length; i++)
	{
		let cookie = cookieArray[i];
		while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1);}
		if (cookie.indexOf(name) == 0) {
			return cookie.substring(name.length, cookie.length);}
	}
	return "";
}

function setLanguageCookie(lang)
{
	document.cookie = "userLanguage=" + lang + "; path=/; max-age=31536000; SameSite=Lax";
}

let currentLanguage = 'en'; // Default language

function setLanguage(lang)
{
	if (translations[lang]) {
		currentLanguage = lang;
		updateLanguageButtonUI(lang);}
	else {
        console.warn(`Language ${lang} not found, falling back to English`);
        currentLanguage = 'en';
		updateLanguageButtonUI('en');}
}

function updateLanguageButtonUI(lang)
{
    document.querySelectorAll('.languageButton').forEach(button => {
        button.classList.remove('active');
    });
    const activeButton = document.getElementById(lang);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

//Vocabulary

const translations = {
	en: {
		head: "Transcendence - Pong Game",//Head
		pageTitle: "Transcendence",//Page Title
		pongTitle: "PONG",//Page subtitle
		//Register
		register: "Register",
		usernamePlaceholder: "Username",
		emailPlaceholder: "Email",
		firstNamePlaceholder: "First name",
		passwordPlaceholder: "Password",
		loginFromRegister: "Already have an account? Login",
		//Login
		login: "Login",
		registerFromLogin: "Not an account yet ? Register",
		playAsGuest: "Play as guest",
		//2FA
		twoFA_Verification: "2FA Verification",
		twoFA_placeholder: "Enter the 2FA code received by email",
		validate: "Validate",
		//Menu
		profile: "Profile",
		playClassic: "Play Classic",
		playMultiplayer: "Play Multiplayer",
		playRemote: "Play Remote",
		//Profile
		userProfile: "User Profile",
		username: "Username:",
		dynamicUsername: "Username:",
		email: "Email:",
		dynamicEmail: "Email:",
		firstName: "First Name:",
		dynamicFirstName: "First Name:",
		wins: "Wins:",
		dynamicWins: "Wins:",
		losses: "Losses:",
		dynamicLosses: "Losses:",
		editProfile: "Edit profile",
		friends: "Friends",
		backToMenu: "Back to menu",
		logOut: "Logout",
		//Match history
		matchHistory: "Match History",
		noMatch: "No matches played yet",
		//Friend
		friendsList: "Friends List",
		addFriend: "Add a Friend",
		addFriendButton: "Add Friend",
		friendsRequests: "Friend Requests",
		accept: "Accept",
		noFriendRequest: "No friend requests",
		cancel: "Cancel",
		//Edit Profile
		saveChanges: "Save changes",
		//Settings
		settings: "Settings",
		yourName: "Enter your name",
		player1: "Player 1",
		player1Placeholder: "Enter Player 1 name",
		player2: "Player 2",
		player2Placeholder: "Enter Player 2 name",
		player3: "Player 3",
		player3Placeholder: "Enter Player 3 name",
		player4: "Player 4",
		player4Placeholder: "Enter Player 4 name",
		difficulty: "Choose difficulty",
		easy: "Easy",
		medium: "Medium",
		hard: "Hard",
		startGame: "Start Game",
		back: "Back",
		//Game
		gameMode: "Select Game Mode",
		onePlayer: "1 Player",
		twoPlayers: "2 Players",
		tournament: "Tournament",
		send: "Send",
		controls: "Controls",
		controlsP: "(Controls",
		playerWinsPrefix: " ",
		playerWins: " wins!",
		restart: "Restart",
		nextGame: "Next Game",
		results: "Results",
		won: "won!",
		//Multiplayers
		threePlayers: "3 Players",
		fourPlayers: "4 Players",
		//Tournament
		points: "points",
		tournamentStage: "First game",
		tournamentFirstGame: "First game:",
        tournamentSecondGame: "Second game:",
        tournamentSmallFinal: "Small Final game:",
        tournamentFinal: "Final game:",
        tournamentWinner: "We have a winner! Well played everybody!",
		//Chat menu
		searchFriends: "Search friends",
		search: "Search",
    },

    fr: {
		head: "Transcendance - Jeu de Pong",
		pageTitle: "Transcendance",
		pongTitle: "PONG",
		//Register
		register: "S'inscrire",
		usernamePlaceholder: "Nom d'utilisateur",
		emailPlaceholder: "E-mail",
		firstNamePlaceholder: "Prénom",
		passwordPlaceholder: "Mot de passe",
		loginFromRegister: "Vous avez déjà un compte ? Connectez-vous",
		//Login
		login: "Connexion",
		registerFromLogin: "Pas encore de compte ? Inscrivez-vous",
		playAsGuest: "Jouer en tant qu'invité(e)",
		//2FA
		twoFA_Verification: "Vérification 2FA",
		twoFA_placeholder: "Entrez le code 2FA reçu par e-mail",
		validate: "Valider",
		//Menu
		profile: "Profil",
		playClassic: "Jouer en Classique",
		playMultiplayer: "Jouer en Multijoueur",
		playRemote: "Jouer à Distance",
		//Profile
		userProfile: "Profil Utilisateur",
		username: "Nom d'utilisateur :",
		dynamicUsername: "Nom d'utilisateur :",
		email: "E-mail :",
		dynamicEmail: "E-mail :",
		firstName: "Prénom :",
		dynamicFirstName: "Prénom :",
		wins: "Victoires :",
		dynamicWins: "Victoires :",
		losses: "Défaites :",
		dynamicLosses: "Défaites :",
		editProfile: "Modifier le profil",
		friends: "Amis",
		backToMenu: "Retour au menu",
		logOut: "Déconnexion",
		//Match history
		matchHistory : "Historique du match",
		noMatch : "Aucun match n'a encore été joué",
		//Friend
		friendsList: "Liste d'amis",
		addFriend: "Ajouter un ami",
		addFriendButton: "Ajouter",
		friendsRequests: "Demandes d'amis",
		accept: "Accepter",
		noFriendRequest: "Aucune demande d'ami",
		cancel: "Annuler",
		//Edit Profile
		saveChanges: "Enregistrer les modifications",
		//Settings
		settings: "Paramètres",
		yourName: "Entrez votre nom",
		player1: "Joueur 1",
		player1Placeholder: "Entrez le nom du Joueur 1",
		player2: "Joueur 2",
		player2Placeholder: "Entrez le nom du Joueur 2",
		player3: "Joueur 3",
		player3Placeholder: "Entrez le nom du Joueur 3",
		player4: "Joueur 4",
		player4Placeholder: "Entrez le nom du Joueur 4",
		difficulty: "Choisissez la difficulté",
		easy: "Facile",
		medium: "Moyen",
		hard: "Difficile",
		startGame: "Commencer la partie",
		back: "Retour",
		//Game
		gameMode: "Sélectionnez le mode de jeu",
		onePlayer: "1 Joueur",
		twoPlayers: "2 Joueurs",
		tournament: "Tournoi",
		send: "Envoyer",
		controls: "Commandes",
		controlsP: "(Commandes",
		playerWinsPrefix: " ",
		playerWins: " gagne !",
		restart: "Recommencer",
		nextGame: "Match suivant",
		results: "Résultats",
		won: "a gagné !",
		//Multiplayers
		threePlayers: "3 Joueurs",
		fourPlayers: "4 Joueurs",
		//Tournament
		points: "points",
		tournamentStage: "Premier match",
		tournamentFirstGame: "Premier match :",
        tournamentSecondGame: "Deuxième match :",
        tournamentSmallFinal: "Petite finale :",
        tournamentFinal: "Finale :",
        tournamentWinner: "Nous avons un gagnant ! Bien joué à tous !",
		//Chat menu
		searchFriends: "Rechercher des amis",
		search: "Rechercher",
    },

    es: {
		head: "Transcendencia - Juego de Pong",
		pageTitle: "Transcendencia",
		pongTitle: "PONG",
		//Register
		register: "Registrarse",
		usernamePlaceholder: "Nombre de usuario",
		emailPlaceholder: "Correo electrónico",
		firstNamePlaceholder: "Nombre",
		passwordPlaceholder: "Contraseña",
		loginFromRegister: "¿Ya tienes una cuenta? Inicia sesión",
		//Login
		login: "Iniciar sesión",
		registerFromLogin: "¿No tienes cuenta aún? Regístrate",
		playAsGuest: "Jugar como invitado",
		//2FA
		twoFA_Verification: "Verificación 2FA",
		twoFA_placeholder: "Introduzca el código 2FA recibido por correo electrónico",
		validate: "Validar",
		//Menu
		profile: "Perfil",
		playClassic: "Jugar Clásico",
		playMultiplayer: "Jugar Multijugador",
		playRemote: "Jugar Remoto",
		//Profile
		userProfile: "Perfil de Usuario",
		username: "Nombre de usuario:",
		dynamicUsername: "Nombre de usuario:",
		email: "Correo electrónico:",
		dynamicEmail: "Correo electrónico:",
		firstName: "Nombre:",
		dynamicFirstName: "Nombre:",
		wins: "Victorias:",
		dynamicWins: "Victorias:",
		losses: "Derrotas:",
		dynamicLosses: "Derrotas:",
		editProfile: "Editar perfil",
		friends: "Amigos",
		backToMenu: "Volver al menú",
		logOut: "Cerrar sesión",
		//Match history
		matchHistory: "Historia del partido",
		noMatch: "Todavía no se ha jugado ningún partido",
		//Friend
		friendsList: "Lista de amigos",
		addFriend: "Agregar un amigo",
		addFriendButton: "Agregar amigo",
		friendsRequests: "Solicitudes de amistad",
		accept: "Aceptar",
		noFriendRequest: "No hay solicitudes de amistad",
		cancel: "Cancelar",
		//Edit Profile
		saveChanges: "Guardar cambios",
		//Settings
		settings: "Configuraciones",
		yourName: "Ingresa tu nombre",
		player1: "Jugador 1",
		player1Placeholder: "Ingrese el nombre del Jugador 1",
		player2: "Jugador 2",
		player2Placeholder: "Ingrese el nombre del Jugador 2",
		player3: "Jugador 3",
		player3Placeholder: "Ingrese el nombre del Jugador 3",
		player4: "Jugador 4",
		player4Placeholder: "Ingrese el nombre del Jugador 4",
		difficulty: "Elige la dificultad",
		easy: "Fácil",
		medium: "Medio",
		hard: "Difícil",
		startGame: "Iniciar juego",
		back: "Atrás",
		//Game
		gameMode: "Selecciona el modo de juego",
		onePlayer: "1 Jugador",
		twoPlayers: "2 Jugadores",
		tournament: "Torneo",
		send: "Enviar",
		controls: "Controles",
		controlsP: "(Controles",
		playerWinsPrefix: "¡",
		playerWins: " gana!",
		restart: "Reiniciar",
		nextGame: "Próximo Juego",
		results: "Resultados",
		won: "¡ganó!",
		//Multiplayers
		threePlayers: "3 Jugadores",
		fourPlayers: "4 Jugadores",
		//Tournament
		points: "puntos",
		tournamentStage: "Primer partido",
		tournamentFirstGame: "Primer juego:",
        tournamentSecondGame: "Segundo juego:",
        tournamentSmallFinal: "Juego por el tercer puesto:",
        tournamentFinal: "Juego final:",
        tournamentWinner: "¡Tenemos un ganador! ¡Bien jugado todo el mundo!",
		//Chat menu
		searchFriends: "Buscar amigos",
		search: "Buscar",
	},

	de: {
		head: "Transzendenz - Pong-Spiel",
		pageTitle: "Transzendenz",
		pongTitle: "PONG",
		//Register
		register: "Registrieren",
		usernamePlaceholder: "Benutzername",
		emailPlaceholder: "E-Mail",
		firstNamePlaceholder: "Vorname",
		passwordPlaceholder: "Passwort",
		loginFromRegister: "Bereits ein Konto? Anmelden",
		//Login
		login: "Anmelden",
		registerFromLogin: "Noch kein Konto? Registrieren",
		playAsGuest: "Als Gast spielen",
		//2FA
		twoFA_Verification: "2FA-Verifizierung",
		twoFA_placeholder: "Geben Sie den per E-Mail erhaltenen 2FA-Code ein",
		validate: "Bestätigen",
		//Menu
		profile: "Profil",
		playClassic: "Klassisch spielen",
		playMultiplayer: "Mehrspieler spielen",
		playRemote: "Fernspiel",
		//Profile
		userProfile: "Benutzerprofil",
		username: "Benutzername:",
		dynamicUsername: "Benutzername:",
		email: "E-Mail:",
		dynamicEmail: "E-Mail:",
		firstName: "Vorname:",
		dynamicFirstName: "Vorname:",
		wins: "Siege:",
		dynamicWins: "Siege:",
		losses: "Niederlagen:",
		dynamicLosses: "Niederlagen:",
		editProfile: "Profil bearbeiten",
		friends: "Freunde",
		backToMenu: "Zurück zum Menü",
		logOut: "Abmelden",
		//Match history
		matchHistory: "Spielverlauf",
		noMatch: "Es wurden noch keine Spiele gespielt",
		//Friend
		friendsList: "Freundesliste",
		addFriend: "Freund hinzufügen",
		addFriendButton: "Freund hinzufügen",
		friendsRequests: "Freundschaftsanfragen",
		accept: "Akzeptieren",
		noFriendRequest: "Keine Freundschaftsanfragen",
		cancel: "Abbrechen",
		//Edit Profile
		saveChanges: "Änderungen speichern",
		//Settings
		settings: "Einstellungen",
		yourName: "Geben Sie Ihren Namen ein",
		player1: "Spieler 1",
		player1Placeholder: "Namen für Spieler 1 eingeben",
		player2: "Spieler 2",
		player2Placeholder: "Namen für Spieler 2 eingeben",
		player3: "Spieler 3",
		player3Placeholder: "Namen für Spieler 3 eingeben",
		player4: "Spieler 4",
		player4Placeholder: "Namen für Spieler 4 eingeben",
		difficulty: "Schwierigkeitsgrad wählen",
		easy: "Leicht",
		medium: "Mittel",
		hard: "Schwer",
		startGame: "Spiel starten",
		back: "Zurück",
		//Game
		gameMode: "Spielmodus auswählen",
		onePlayer: "1 Spieler",
		twoPlayers: "2 Spieler",
		tournament: "Turnier",
		send: "Senden",
		controls: "Steuerung",
		controlsP: "(Steuerung",
		playerWinsPrefix: " ",
		playerWins: " gewinnt!",
		restart: "Neustart",
		nextGame: "Nächstes Spiel",
		results: "Ergebnisse",
		won: "hat gewonnen!",
		//Multiplayers
		threePlayers: "3 Spieler",
		fourPlayers: "4 Spieler",
		//Tournament
		points: "Punkte",
		tournamentStage: "Erstes Spiel",
		tournamentFirstGame: "Erstes Spiel:",
        tournamentSecondGame: "Zweites Spiel:",
        tournamentSmallFinal: "Spiel um Platz 3:",
        tournamentFinal: "Finalspiel:",
        tournamentWinner: "Wir haben einen Gewinner! Gut gespielt, Leute!",
		//Chat menu
		searchFriends: "Freunde suchen",
		search: "Suchen",
	},

  };
