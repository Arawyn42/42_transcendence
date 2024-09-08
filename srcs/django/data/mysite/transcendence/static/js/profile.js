// Button 'menu'
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('menuFromProfile').addEventListener('click', function ()
    {
        switchScreen('menuScreen');
        console.log('Go to menu');
    });
});

// Show the user profile when clicking on 'Profile' from 'Menu'
function showProfile() {
    switchScreen('profileScreen');

    // Récupérer les données de l'utilisateur depuis Django
    fetch('/profile/', {
        method: 'GET',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')  // Récupération du token CSRF
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('profileUsername').textContent = data.username;
        document.getElementById('profileEmail').textContent = data.email;
        document.getElementById('profileFirstName').textContent = data.first_name;
        document.getElementById('profileWins').textContent = data.victory_count;
        document.getElementById('profileLosses').textContent = data.defeat_count;
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
    });
}

// Fonction pour obtenir le cookie CSRF
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

