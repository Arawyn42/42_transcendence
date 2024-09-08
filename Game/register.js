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
            alert('Inscription réussie, vous pouvez maintenant vous connecter.');
            // Réinitialiser le formulaire ou rediriger l'utilisateur
            document.getElementById('registerForm').reset();
        } else {
            alert('Erreur lors de l\'inscription: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
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
