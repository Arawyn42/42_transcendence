async function WebSocketStatus() {
    console.log("WebSocketsStatus start");
    updateFriendsList();
    statusSocket = new WebSocket(`wss://${window.location.host}/ws/status/`);

    statusSocket.onopen = function() {
        console.log("WebSocket connection opened.");
    };

    statusSocket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log("Received status update:", data);  

        const statusElement = document.getElementById(`status_${data.userId}`);
        if (statusElement) {
            const statusSpan = statusElement.querySelector('.friend-status');
            if (statusSpan) {
                statusSpan.textContent = data.status;
            }
        } else {
            console.log("friend not found in the DOM");
        }
    };

    statusSocket.onclose = function() {
        console.log("WebSocket connection closed.");
    };

    statusSocket.onerror = function(error) {
        console.error("WebSocket error:", error);
    };
}

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