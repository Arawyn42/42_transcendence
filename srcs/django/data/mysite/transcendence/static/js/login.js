// Button 'Register' (ensure that the DOM content is fully loaded first)
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('registerFromLogin').addEventListener('click', function ()
	{
		switchScreen('registerScreen');
		console.log('Opening Register Screen from Login Screen');
	});
});

// Button 'Login'
document.getElementById("loginForm").onsubmit = function(event) {

	// Temporary: Do nothing if the 'Skip and go to menu' button is clicked
	if (document.activeElement === document.getElementById('tempMenuButton'))
        return;


	event.preventDefault();
	
	// Envoie de la requête de connexion à Django
	fetch('/login/', {
		method: 'POST',
		body: new FormData(document.getElementById('loginForm')),
		headers: {
			'X-CSRFToken': getCookie('csrftoken')  // Récupération du token CSRF
		}
	})
	.then(response => {
		if (response.ok) {
			return response.json();
		} else {
			return response.json().then(data => { 
				throw new Error(data.error || 'Unknown error');
			});
		}
	})
	.then(data => {
		if (data.success) {
			document.getElementById('profileUsername').textContent = data.username;
			switchScreen('menuScreen');
		} else {
			alert('Error: ' + data.error);
		}
	})
	.catch(error => {
		alert('Connection error: ' + error.message);
		console.error('Connection error:', error);
	});
};


function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

const csrftoken = getCookie('csrftoken');

fetch('/login/', {
	method: 'POST',
	body: new FormData(document.getElementById('loginForm')),
	headers: {
		'X-CSRFToken': csrftoken  // Ajout du token CSRF dans l'en-tête
	}
}).then(response => {
	// Gestion de la réponse
});




// TEMPORARY: Button to skip login and go directly to 'Menu'
document.addEventListener('DOMContentLoaded', function () {
	const skipButton = document.getElementById('tempMenuButton');
	
	skipButton.addEventListener('click', function (event) {
		event.preventDefault();
		switchScreen('menuScreen');
		console.log('Skipping login and going to menu');
	});
});