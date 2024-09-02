// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


// Colors
const WHITE = '#fff';
const BLACK = '#000';
const GREEN = '#00FF00';
const RED = '#FF0000';

// Fonts
const TITLE_SIZE = canvas.height * 0.06;
const TITLE_POS_Y = TITLE_SIZE;
const SUBTITLE_SIZE = TITLE_SIZE * 0.7;

// Scores
const MAX_SCORE = 5;
const SCORES_POS_Y = TITLE_POS_Y + SUBTITLE_SIZE * 3 / 2;

// Buttons
const MENU_BUTTON_WIDTH = canvas.width * 0.38;
const MENU_BUTTON_HEIGHT = canvas.height * 0.1;
const BUTTON_TEXT_SIZE = MENU_BUTTON_HEIGHT * 0.35;

// Game area
const GAME_AREA_POS_Y = SCORES_POS_Y + SUBTITLE_SIZE / 3;
const GAME_AREA_WIDTH = canvas.width;
const GAME_AREA_HEIGHT = canvas.height - GAME_AREA_POS_Y;

// Paddles and ball sizes
const BALL_RADIUS = canvas.height * 0.02;
const PADDLE_WIDTH = canvas.height * 0.015;
const PADDLE_HEIGHT = canvas.height * 0.2;