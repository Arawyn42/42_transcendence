// Yooo je t'ai changé deux trois trucs genre les petites erreurs etc.
// Pour le texte, et si possible les commentaires, mets tout en anglais si tu peux
// Qu'on alterne pas entre 2 langues dans le code et que ça reste propre :p
// PS : tu peux bien sûr supprimer ce commentaire ^^


// Button 'Login' (ensure that the DOM Content is fully loaded first)
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('loginFromRegister').addEventListener('click', function ()
	{
		switchScreen('loginScreen');
		console.log('Go to login');
	});
});


document.getElementById("registerForm").onsubmit = function(event) {
	event.preventDefault();

	// Envoie de la requête d'inscription à Django
	fetch('/register/', {
		method: 'POST',
		body: new FormData(document.getElementById('registerForm')),
		headers: {
			'X-CSRFToken': getCookie('csrftoken')  // Récupération du token CSRF
		}
	})
	.then(response => response.json())
	.then(data => {
		if (data.success) {
			alert('You registered successfully! You can now connect to you account.');
			// Réinitialiser le formulaire ou rediriger l'utilisateur
			document.getElementById('registerForm').reset();
			switchScreen('loginScreen');
		} else {
			alert(`Error while registering: ${data.error}`);
		}
	})
	.catch(error => {
		console.error(`Error: ${error.message}`);
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
