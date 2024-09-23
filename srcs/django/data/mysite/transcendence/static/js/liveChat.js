
function closeSocketConnection() {
	console.log("==WEBSOCKET DECONNECTION==");
	chatSocket.close();
}

function chatConnection() {
	
	let temp_room_name = "temp";
	console.log("==WEBSOCKET CONNECTION==");
	let chatInput = document.getElementById("chatInput");
	let messages = document.getElementById("messages");
	chatSocket = new WebSocket(`ws://${window.location.host}/ws/socket-server/${temp_room_name}/`);

	chatSocket.onopen = function(e) {
		console.log("WebSocket connection established.");
	}

	chatSocket.onclose = function(e) {
		messages.innerHTML = "";
	}

	chatSocket.onmessage = function(e) {
		let data = JSON.parse(e.data);
		console.log("Message from server:", data);

		if (data.type === "chat") {
			let div = document.createElement('div');
			let p = document.createElement('p');
			p.textContent = `${data.username}: ${data.message}`;
			div.appendChild(p);
			messages.insertAdjacentElement('beforeend', div);
		}
	}

	chatSocket.onerror = function(error) {
		console.error("WebSocket error:", error);
	}

	chatInput.addEventListener("submit", (e)=> {
		e.preventDefault();
		let message = e.target.message.value;
		if (message) {
			console.log("sending message:", message);
			chatSocket.send(JSON.stringify({
				'message':message,
			}));
		}
		chatInput.reset()
	});
}