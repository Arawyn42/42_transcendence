// Button 'menu'
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('editProfile').addEventListener('click', function ()
    {
        switchScreen('editProfileScreen');
        console.log('Go to edit profile screen');
    });
});

function showEditProfile() {
    switchScreen('editProfileScreen');
    
    fetch('/profile/', {
        method: 'GET',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('editUsername').value = data.username;
        document.getElementById('editEmail').value = data.email;
        document.getElementById('editFirstName').value = data.first_name;
    })
    .catch(error => {
        console.error('Error retrieving profile data:', error);
    });
}


document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    let formData = new FormData(this);
    
    fetch('/edit-profile/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
    })
    .then(response => response.json())  // Utilise .text() au lieu de .json() pour voir le contenu brut
    .then(data => {
        if (data.success) {
            alert('Profile updated successfully!');
            switchScreen('profileScreen'); 
        } else {
            alert('Error updating profile: ' + data.error);
        }
    })
    .catch(error => {
		console.error(`Error: ${error.message}`);
	});
});  

document.getElementById('cancelEditProfile').addEventListener('click', function() {
    switchScreen('profileScreen'); 
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
