function showChat() {
    switchScreen('dmsScreen');
}

function showDm() {
    switchScreen('dmScreen');
}

const createDmButton	= document.getElementById("createDmButton");
const usernameInput		= document.getElementById("usernameInput");
const dmsList			= document.getElementById("dmsList");

createDmButton.onclick = function(){
	const dmDiv 			= document.createElement("div");
	const dmUsername		= document.createElement("p");
	const username 			= usernameInput.value;

	dmDiv.classList.add("dmDiv");

	dmUsername.classList.add("dmUsername")
	dmUsername.textContent = username;
	
	dmDiv.appendChild(dmUsername);

	dmsList.appendChild(dmDiv);
}

dmsList.addEventListener('click', function(event) {
    if (event.target.classList.contains('dmDiv')) {
		showDm("dmScreen");
    }
});

document.getElementById("sendMsg").addEventListener("submit", function(event) {
	event.preventDefault();

	const inputField = document.getElementById("msgInput");
	const msgList = document.getElementById("msgList");

	const msgDiv = document.createElement("div");
	const msgP = document.createElement("p");
	
	console.log(inputField.value);
	msgP.textContent = inputField.value;
	msgP.classList.add("msgText");
	msgDiv.appendChild(msgP);
	msgDiv.classList.add("personalMsgDiv");

	msgList.appendChild(msgDiv);
	
	inputField.value = "";
});
