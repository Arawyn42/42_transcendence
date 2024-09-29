document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('editProfile').addEventListener('click', function () {
        switchScreen('editProfileScreen')
        console.log('Go to edit profile screen');
    });

    document.getElementById('editProfileForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        let formData = new FormData(this);
        
        fetch('/edit-profile/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Authorization': 'Bearer ' + localStorage.getItem('access_token') // JWT token if required
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                return response.json().then(data => {
                    if (data.redirect) {
                        switchScreen('loginScreen');
                    }
                    throw new Error(data.error || 'Unauthorized');
                });
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            if (data.success) {
                alert('Profile updated successfully!');
                document.getElementById('editProfileForm').reset();
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
