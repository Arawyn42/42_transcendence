const createDmButton	= document.getElementById("searchDmButton");
const usernameInput		= document.getElementById("searchDmUsernameInput");
const dmsList			= document.getElementById("dmsList");
const msgList 			= document.getElementById("msgList");

function showChat() {
    switchScreen('dmsScreen');
}

function showDm() {
	msgList.innerHTML = "";
    switchScreen('dmScreen');
}


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
		const dmUsername = event.target.querySelector('p').textContent;
		const dmHeaderP = document.getElementById("dmHeaderP");
		dmHeaderP.textContent = "Direct message: " + dmUsername;
		chatConnection(dmUsername);
		showDm("dmScreen");
    }
});
