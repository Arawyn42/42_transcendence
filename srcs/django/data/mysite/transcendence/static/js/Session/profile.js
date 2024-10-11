// Button 'menu'
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('menuFromProfile').addEventListener('click', function ()
    {
        switchScreen('menuScreen');
        console.log('Go to menu');
    });
});

// Button 'Friends'
document.addEventListener('DOMContentLoaded', function () {
    const friendButton = document.getElementById('friendFromProfile');
    if (friendButton) {
        friendButton.addEventListener('click', function () {
            console.log('Go to friend');
            switchScreen('friendScreen');
        });
    } else {
        console.log('Button not found');
    }
});

// Show the user profile when clicking on 'Profile' from 'Menu'
function showProfile() {
    switchScreen('profileScreen');

    fetch('/profile/', {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrfToken,
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },

        success: function(response) {
        },
        error: function(error) {
            console.log("Error:", error);
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            return response.json().then(data => {
                if (data.redirect) {
                    switchScreen('loginScreen');  // Assurez-vous que 'loginScreen' est défini
                }
                throw new Error(data.error || 'Unauthorized');
            });
        } else {
            throw new Error('Network response was not ok.');
        }
    
    })
    .then(data => {
        console.log(data);
        
        document.getElementById('profileUsername').textContent = data.username;
        document.getElementById('profileEmail').textContent = data.email;
        document.getElementById('profileFirstName').textContent = data.first_name;
        document.getElementById('profileWins').textContent = data.victory_count;
        document.getElementById('profileLosses').textContent = data.defeat_count;
        
        const historyList = document.getElementById('matchHistoryList');
        console.log(historyList);
        
        historyList.innerHTML = '';
        if (data.match_history.length > 0) {
            data.match_history.forEach(match => {
                const li = document.createElement('li');
                li.textContent = `Date: ${match.date}, Result: ${match.result}, Opponent: ${match.opponent}`;
                historyList.appendChild(li);
            });
        } else {
            historyList.innerHTML = '<li textTranslated="noMatch">No match played yet</li>';
        }
        
        const friendRequestsList = document.getElementById('friendRequestsList');
        friendRequestsList.innerHTML = '';

        if (data.friend_requests.length > 0) {
            data.friend_requests.forEach(request => {
                const li = document.createElement('li');
                li.textContent = `Friend request from: ${request.from_user}`;
                const acceptButton = document.createElement('button');
                acceptButton.textContent = 'Accept';
                acceptButton.dataset.requestId = request.id;
                acceptButton.classList.add('acceptFriendButton');
                li.appendChild(acceptButton);
                friendRequestsList.appendChild(li);
            });
        } else {
            friendRequestsList.innerHTML = '<li>No friend requests</li>';
        }
    })
    .catch(error => {
        console.error('Error recovering user data:', error);
    });
}

function showFriendProfile(friendname) {
    switchScreen('profileScreen');

	document.getElementById("editProfile").style.display = 'none';
	document.getElementById("friendFromProfile").style.display = 'none';
	
	fetch(`/profileFriend/${friendname}`, {
		method: 'GET',
		headers: {
			'X-CSRFToken': csrfToken,
			'Authorization': 'Bearer ' + localStorage.getItem('access_token')
		},

		success: function(response) {
		},
		error: function(error) {
			console.log("Error:", error);
		}
	})
	.then(response => {
		if (response.ok) {
			return response.json();
		} else if (response.status === 401) {
			return response.json().then(data => {
				if (data.redirect) {
					switchScreen('loginScreen');  // Assurez-vous que 'loginScreen' est défini
				}
				throw new Error(data.error || 'Unauthorized');
			});
		} else {
			throw new Error('Network response was not ok.');
		}
	
	})
	.then(data => {
		console.log(data);
		
		document.getElementById('profileUsername').textContent = data.username;
		document.getElementById('profileEmail').textContent = data.email;
		document.getElementById('profileFirstName').textContent = data.first_name;
		document.getElementById('profileWins').textContent = data.victory_count;
		document.getElementById('profileLosses').textContent = data.defeat_count;
		
		const historyList = document.getElementById('matchHistoryList');
		console.log(historyList);
		
		historyList.innerHTML = '';
		if (data.match_history.length > 0) {
			data.match_history.forEach(match => {
				const li = document.createElement('li');
				li.textContent = `Date: ${match.date}, Result: ${match.result}, Opponent: ${match.opponent}`;
				historyList.appendChild(li);
			});
		} else {
			historyList.innerHTML = '<li textTranslated="noMatch">No match played yet</li>';
		}
	})
	.catch(error => {
		console.error('Error recovering user data:', error);
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

