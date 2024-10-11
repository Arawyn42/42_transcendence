
async function WebSocketStatus() {
    console.log("WebSocketsStatus start");
    statusSocket = new WebSocket(`wss://${window.location.host}/ws/status/`);
    updateFriendsList();

    statusSocket.onmessage = function(e) {
		const data = JSON.parse(e.data);
		console.log("friendsssss" + data['friends']);
        if (data['friends']) {
            data['friends'].forEach(friend => {
                const statusIndicator = document.getElementById(`status_${friend}`);
                statusIndicator.style.display = 'flex';
            });
        }
    };
    statusSocket.onopen = function() {
    };


}

window.addEventListener('beforeunload', function (event) {
	statusSocket.close();
});

document.getElementById('twoFaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // catch 2FA code
    const twoFaCode = document.getElementById('twoFaCode').value; // Assurez-vous que l'ID est correct

    fetch('/2fa/verify/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            '2fa_code': twoFaCode // Send 2FA code
        })
    })
    .then(response => {
        if (!response.ok) {
            alert('Invalid code.');
            document.getElementById('twoFaForm').reset();
            throw new Error('Code is not valid.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            localStorage.setItem('access_token', data.access_token);
            alert('Successful login!');
			document.getElementById('twoFaForm').reset();
            WebSocketStatus();
            switchScreen('menuScreen');
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error verifying 2FA code:', error);
    });
});


function sendemail() {
    fetch('/2fa/enable/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            switchScreen('2faScreen');
        } else {
            alert('Error sending 2FA code.');
        }
    })
    .catch(error => {
        console.error('Error sending 2FA code:', error);
    });
}