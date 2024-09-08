document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault();
    // Envoie de la requête de connexion à Django
    fetch('/login/', {
        method: 'POST',
        body: new FormData(document.getElementById('loginForm')),
        headers: {
            'X-CSRFToken': getCookie('csrftoken')  // Récupération du token CSRF
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('userProfileName').textContent = data.username;
            switchScreen('profileView');
        } else {
            alert('Erreur de connexion');
        }
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