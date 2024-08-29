// Canvas
const canvas = document.createElement('canvas');
canvas.id = 'gameCanvas';
canvas.width = 1000;
canvas.height = 800;
document.body.appendChild(canvas);

// Context
const ctx = canvas.getContext('2d');

// Constantes
const MAX_SCORE = 10;
const MENU_BUTTON_WIDTH = 200;
const MENU_BUTTON_HEIGHT = 50;