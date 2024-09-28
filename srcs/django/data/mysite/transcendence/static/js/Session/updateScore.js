function sendScoreUpdate(result) {
    fetch('/update-scores/', {
        method: 'POST',
        body: new URLSearchParams({
            'result': result
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/x-www-form-urlencoded'
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
