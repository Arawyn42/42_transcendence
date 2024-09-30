// Button 'Register' (ensure that the DOM content is fully loaded first)
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('registerFromLogin').addEventListener('click', function ()
	{
		switchScreen('registerScreen');
		console.log('Opening Register Screen from Login Screen');
	});
});


document.getElementById("loginForm").onsubmit = function(event) {

	// Do nothing if the 'Play as guest' button is clicked
	if (document.activeElement === document.getElementById('playAsGuest'))
        return;


	event.preventDefault();
	
	fetch('/login/', {
		method: 'POST',
		body: new FormData(document.getElementById('loginForm')),
		headers: {
			'X-CSRFToken': getCookie('csrftoken')
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
			alert('2FA required. Please enter the code sent to your email.');
			document.getElementById('loginForm').reset();
			switchScreen('2faScreen');
		} else {
			alert('Error: ' + data.error);
		}
	})
	.catch(error => {
		alert('Connection error: ' + error.message);
		console.error('Connection error:', error);
	});
};

document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    switchScreen('loginScreen');
    console.log('Déconnexion réussie, tokens supprimés');
});


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

// Button 'Play as guest'
document.addEventListener('DOMContentLoaded', function () {
	const skipButton = document.getElementById('playAsGuest');
	
	skipButton.addEventListener('click', function (event) {
		event.preventDefault();
		switchScreen('menuScreen');
		console.log('Skipping login and going to menu');
	});
});