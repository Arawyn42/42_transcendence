document.getElementById('2faForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // catch 2FA code
    const twoFaCode = document.getElementById('twoFaCode').value; // Assurez-vous que l'ID est correct

    fetch('/verify-2fa/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            '2fa_code': twoFaCode // Send 2FA code
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            //localStorage.setItem('access_token', data.access_token); 
            alert('Successful login!');
            switchScreen('menuScreen');
        } else {
            alert('Erreur: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error verifying 2FA code:', error);
    });
});


function sendemail() {
    fetch('/enable-2fa/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
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