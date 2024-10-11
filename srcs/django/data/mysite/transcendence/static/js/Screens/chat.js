const searchDmButton	= document.getElementById("searchDmButton");
const usernameInput		= document.getElementById("searchDmUsernameInput");
const dmsList			= document.getElementById("dmsList");
const msgList 			= document.getElementById("msgList");


function showDmList() {
    switchScreen('dmsScreen');
	dmsList.innerHTML = "";

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
		}
	})
	.then(data => {
        if (data.friends && data.friends.length > 0) {
			data.friends.forEach(friend => {
				createDmDiv(friend.username);
            });
		}
	})
    .catch(error => console.error(`Error: ${error}`));
}

function showDm() {
	msgList.innerHTML = "";
    switchScreen('dmScreen');
}

document.getElementById("searchDmfield").addEventListener("submit", async function(event) {
	event.preventDefault();	
	const username 	= usernameInput.value;
	usernameInput.value = "";

	if (USERNAME === username) {
		alert("Cannot open a conversation with yourself");
		return ;
	}

	const openDms = document.getElementsByClassName("dmUsername");
	for (let i = 0; i < openDms.length; i++) {
		if (openDms[i].textContent === username)
			return ;
	}

	if (username.trim() !== '') {
		fetch(`/check-user-exists/?username=${username}`)
			.then(response => response.json())
			.then(data => {
				if (data.exists) {
					createDmDiv(username);
				}
				else {
					alert("This user does not exist");
				}
			})
	}
});

dmsList.addEventListener('click', function(event) {
    if (event.target.classList.contains('dmDiv') || event.target.classList.contains('dmUsername')) {
		const dmUsername = event.target.querySelector('p').textContent;
		const dmHeaderP = document.getElementById("dmHeaderP");
		dmHeaderP.textContent = "Direct message: " + dmUsername;
		chatConnection(dmUsername);
		showDm("dmScreen");
    } else if (event.target.classList.contains('dmBlockButton')) {
		blockUser(event.target.dataset.user);
		event.target.textContent = "UnBlock";
		event.target.classList.remove('dmBlockButton');
		event.target.classList.add('dmUnBlockButton');
	} else if (event.target.classList.contains('dmUnBlockButton')) {
		unBlockUser(event.target.dataset.user);
		event.target.textContent = "Block";
		event.target.classList.remove('dmUnBlockButton');
		event.target.classList.add('dmBlockButton');
	}
});

function unBlockUser(username) {
	fetch(`/unblock/${username}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'X-CSRFToken': csrfToken
        },
	})
	.then(response => response.json())
	.then(data => {
		if (data.success) {
			console.log("unblocked");
		} else {
			console.error("Error:", data.error);
		}
	})
	.catch(error => console.error("Error:", error));
}

function blockUser(username) {
	fetch(`/block/${username}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'X-CSRFToken': csrfToken
        },
	})
	.then(response => response.json())
	.then(data => {
		if (data.success) {
			console.log("blocked");
		} else {
			console.error("Error:", data.error);
		}
	})
	.catch(error => console.error('Error:', error));
}

async function isUserBlocked(username) {
	return fetch(`/isblocked/${username}/`, {
		method: 'GET',
		headers: {
			'X-CSRFToken': csrfToken,
			'Authorization': 'Bearer ' + localStorage.getItem('access_token')
		},
	})
	.then(response => response.json())
	.then(data => {
		if (data.success) {
			return (data.isBlocked);
		} else {
			console.error("Error:", data.error);
			return (false);
		}
	})
	.catch(error => console.error('Error:', error));
}

function createDmDiv(interlocutor) {
	const dmDiv 		= document.createElement("div");
	const dmUsername	= document.createElement("p");
	const dmBlockButton	= document.createElement("button");

	dmUsername.classList.add("dmUsername")
	dmUsername.textContent = interlocutor;
	
	dmBlockButton.setAttribute("data-user", interlocutor);

	isUserBlocked(interlocutor)
		.then(isBlocked => {
			if (isBlocked) {
				console.log("blocked");
				dmBlockButton.classList.add("dmUnBlockButton");
				dmBlockButton.textContent = "UnBlock";
			} else {
				console.log("notblocked");
				dmBlockButton.classList.add("dmBlockButton");
				dmBlockButton.textContent = "Block";
			}
		})
	
	dmDiv.classList.add("dmDiv");
	dmDiv.appendChild(dmUsername);
	dmDiv.appendChild(dmBlockButton);

	dmsList.appendChild(dmDiv);
}