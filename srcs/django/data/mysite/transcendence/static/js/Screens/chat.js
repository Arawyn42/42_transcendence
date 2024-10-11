const searchDmButton	= document.getElementById("searchDmButton");
const usernameInput		= document.getElementById("searchDmUsernameInput");
const dmsList			= document.getElementById("dmsList");
const msgList 			= document.getElementById("msgList");

function showDmList() {
    switchScreen('dmsScreen');

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
				const dmDiv 		= document.createElement("div");
				const dmUsername	= document.createElement("p");
			
				dmDiv.classList.add("dmDiv");
			
				dmUsername.classList.add("dmUsername")
				dmUsername.textContent = friend.username;
				
				dmDiv.appendChild(dmUsername);
			
				dmsList.appendChild(dmDiv);
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

	if (username.trim() !== '') {
		fetch(`/check-user-exists/?username=${username}`)
			.then(response => response.json())
			.then(data => {
				if (data.exists) {
					const dmDiv 		= document.createElement("div");
					const dmUsername	= document.createElement("p");
				
					dmDiv.classList.add("dmDiv");
				
					dmUsername.classList.add("dmUsername")
					dmUsername.textContent = username;
					
					dmDiv.appendChild(dmUsername);
				
					dmsList.appendChild(dmDiv);
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
    }
});
