document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('profileFromFriend').addEventListener('click', function ()
    {
        switchScreen('profileScreen');
        console.log('Go to profile');
    });
});

document.getElementById('addFriendButton').addEventListener('click', function() {
    let username = document.getElementById('friendUsername').value;

    fetch('/send-friend-request/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify({ username: username })
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
        if (data.success) {
            alert('Friend request sent!');
        } else {
            alert(`Error: ${data.error}`);
        }
    })
    .catch(error => console.error(`Error: ${error}`));
});


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('friendRequestsList').addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('acceptFriendButton')) {
            const requestId = event.target.dataset.requestId;
            console.log('Request ID:', requestId);

            fetch('/accept-friend-request/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                body: JSON.stringify({ request_id: requestId })
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
                if (data.success) {
                    alert('Friend request accepted!');
                    event.target.parentElement.remove();
                } else {
                    alert('Error: ' + data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
});

function updateFriendsList()
{
    fetch('/friends/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
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
        const friendsListDiv = document.getElementById('friendsList');
        if (data.friends && data.friends.length > 0) {
            let friendsHTML = '<ul>';
            data.friends.forEach(friend => {
                friendsHTML += `<li>${friend.username}</li>`;
            });
            friendsHTML += '</ul>';
            friendsListDiv.innerHTML = friendsHTML;
        } else {
            friendsListDiv.innerHTML = 'No friends yet.';
        }
    })
    .catch(error => console.error(`Error: ${error}`));
}

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