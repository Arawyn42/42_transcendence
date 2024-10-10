
const inputField = document.getElementById("msgInput");

// open and manage the connection
function chatConnection(dmName) {
	let roomName;
	if (USERNAME.localeCompare(dmName) > 0) {
		roomName = USERNAME + "_" + dmName + "_room";
	}
	else {
		roomName = dmName + "_" + USERNAME + "_room";
	}

	chatSocket = new WebSocket(`wss://${window.location.host}/ws/socket-server/chat/${roomName}/`);

	chatSocket.onmessage = function(e) {
		const data = JSON.parse(e.data);
		if (data.username === USERNAME) {
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
				'username': USERNAME,
			}));
		}
		inputField.value = "";
	});
};	

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
