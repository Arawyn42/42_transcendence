function sendScoreUpdate(result) {
    fetch('/update-scores/', {
        method: 'POST',
        body: new URLSearchParams({
            'result': result
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
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
        if (data.success) {
            console.log('Scores updated successfully!');
        } else {
            console.error('Error updating scores:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
