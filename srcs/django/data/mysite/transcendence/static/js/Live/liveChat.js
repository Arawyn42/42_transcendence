
const inputField = document.getElementById("msgInput");

async function getUserProfile() {
	try {
		const response = await fetch('/profile/', {
			method: 'GET',
			headers: {
				'X-CSRFToken': getCookie('csrftoken'),
				'Authorization': 'Bearer ' + localStorage.getItem('access_token')
			},
        });
		const data = await response.json();
		let username = data.username;
		return username;
	} catch(error) {
		console.error('Error fetching profile:', error);
	}
}

// open and manage the connection
function openConnection(dmName) {
	getUserProfile().then(username => {
		let roomName;
		if (username.localeCompare(dmName) > 0) {
			roomName = username + "_" + dmName + "_room";
		}
		else {
			roomName = dmName + "_" + username + "_room";
		}

		chatSocket = new WebSocket(`wss://${window.location.host}/ws/socket-server/${roomName}/`);
	
		chatSocket.onmessage = function(e) {
			const data = JSON.parse(e.data);
			if (data.username === username) {
				displayMessage(data.message, "personalMsgDiv");
			}
			else {
				displayMessage(data.message, "otherMsgDiv");
			}
		}
	
		chatSocket.onclose = function(e) {
			console.log("WebSocket: Disconnection from room", roomName);
		}

		// Sending messages
		document.getElementById("sendMsg").addEventListener("submit", function(event) {
			event.preventDefault();
			const message = inputField.value;
	
			if (message.trim() !== '') {
				chatSocket.send(JSON.stringify({
					'message': message,
					'username': username,
				}));
			}
			inputField.value = "";
		});
	});	
}

function displayMessage(msg, msgClass) {
	const msgDiv = document.createElement("div");
	const msgP = document.createElement("p");
	
	msgP.textContent = msg;
	msgP.classList.add("msgText");
	msgDiv.appendChild(msgP);
	msgDiv.classList.add(msgClass);

	msgList.appendChild(msgDiv);
	msgList.scrollTop = msgList.scrollHeight;
}

window.addEventListener("beforeunload", function() {
	if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
		chatSocket.close();
	}
})

function sendMessage() {

}


// function closeSocketConnection() {
// 	console.log("==WEBSOCKET DECONNECTION==");
// 	chatSocket.close();
// }

// function chatConnection() {
	
// 	let temp_room_name = "temp";
// 	console.log("==WEBSOCKET CONNECTION==");
// 	let chatInput = document.getElementById("chatInput");
// 	let messages = document.getElementById("messages");
// 	chatSocket = new WebSocket(`ws://${window.location.host}/ws/socket-server/${temp_room_name}/`);

// 	chatSocket.onopen = function(e) {
// 		console.log("WebSocket connection established.");
// 	}

// 	chatSocket.onclose = function(e) {
// 		messages.innerHTML = "";
// 	}

// 	chatSocket.onmessage = function(e) {
// 		let data = JSON.parse(e.data);
// 		console.log("Message from server:", data);

// 		if (data.type === "chat") {
// 			let div = document.createElement('div');
// 			let p = document.createElement('p');
// 			p.textContent = `${data.username}: ${data.message}`;
// 			div.appendChild(p);
// 			messages.insertAdjacentElement('beforeend', div);
// 		}
// 	}

// 	chatSocket.onerror = function(error) {
// 		console.error("WebSocket error:", error);
// 	}

// 	chatInput.addEventListener("submit", (e)=> {
// 		e.preventDefault();
// 		let message = e.target.message.value;
// 		if (message) {
// 			console.log("sending message:", message);
// 			chatSocket.send(JSON.stringify({
// 				'message':message,
// 			}));
// 		}
// 		chatInput.reset()
// 	});
// }