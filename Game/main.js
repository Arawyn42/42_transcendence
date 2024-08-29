// Object to store event handlers
const eventHandlers = {};

// Create a click events handler
function createHandleClickEvents(scene)
{
	return function (e)
	{
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

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

	switch (scene) {
		case 'menu':
			addClickEvent('menu');
			drawMenu();
			break;
		case 'classic':
			removeClickEvents();
			classicPongGame();
			break;
		case 'end1':
			addClickEvent('end');
			drawEndScreen(1);
			break;
		case 'end2':
			addClickEvent('end');
			drawEndScreen(2);
			break;
		case 'multi':
			break;
	}
}

// Launch the menu
launchScene('menu');
