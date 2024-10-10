function sendScoreUpdate(result) {
    opponent = document.getElementById('player2Label').textContent;
    fetch('/update-score/', {
        method: 'POST',
        body: new URLSearchParams({
            'result': result,
            'opponent': opponent
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })
    .then(response => response.json())
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
