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
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ username: username })
    })
    .then(response => response.json())
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
    // Écouteur d'événement sur le conteneur parent
    document.getElementById('friendRequestsList').addEventListener('click', function (event) {
        // Vérifie si le clic a eu lieu sur un bouton "Accepter"
        if (event.target && event.target.classList.contains('acceptFriendButton')) {
            const requestId = event.target.dataset.requestId;
            console.log('Request ID:', requestId);

            // Faire une requête AJAX pour accepter la requête d'ami
            fetch('/accept-friend-request/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({ request_id: requestId })
            })
            .then(response => response.json())
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


fetch('/list-friends/', {
    method: 'GET',
    headers: {
        'X-CSRFToken': getCookie('csrftoken')
    },
})
.then(response => response.json())
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