// Object to store event handlers
const eventHandlers = {};

// Create a click events handler
function createHandleClickEvents(scene)
{
	return function (e)
	{
		const rect = canvas.getBoundingClientRect();
		const x = (e.clientX - rect.left) * (canvas.width / rect.width);
		const y = (e.clientY - rect.top) * (canvas.height / rect.height);

		switch (scene) {
			case 'menu':
				handleMenuClick(x, y);
				break;
			case 'end':
				handleEndScreenClick(x, y);
				break;
		}
	};
}

// Remove all click events, then store a click event
function addClickEvent(scene)
{
	removeClickEvents();

	const clickEvent = createHandleClickEvents(scene);

	canvas.addEventListener('click', clickEvent);
	eventHandlers[scene] = clickEvent;
}

// Remove all click events
function removeClickEvents()
{
	if (eventHandlers['menu'])
	{
		canvas.removeEventListener('click', eventHandlers['menu']);
		delete eventHandlers['menu'];
	}
	if (eventHandlers['end'])
	{
		canvas.removeEventListener('click', eventHandlers['end']);
		delete eventHandlers['end'];
	}
}

// Launch scene
function launchScene(scene)
{
	removeClickEvents();
	
	switch (scene) {
		case 'menu':
			drawMenu();
			break;
		case 'classic':
			classicPongGame();
			break;
		case 'end1':
			drawEndScreen(1);
			break;
		case 'end2':
			drawEndScreen(2);
			break;
		case 'multi':
			break;
	}
}

// Launch the main scene after the DOM content was loaded
document.addEventListener('DOMContentLoaded', function ()
{
	launchScene('menu');
});