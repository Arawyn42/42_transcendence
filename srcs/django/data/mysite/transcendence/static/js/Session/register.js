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

	fetch('/register/', {
		method: 'POST',
		body: new FormData(document.getElementById('registerForm')),
		headers: {
			'X-CSRFToken': getCookie('csrftoken')
		}
	})
	.then(response => response.json())
	.then(data => {
		if (data.success) {
			alert('You registered successfully! You can now connect to you account.');
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
