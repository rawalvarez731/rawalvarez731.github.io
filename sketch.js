'use strict';

let capture;
let coreyFont;

function preload()
{
	coreyFont = loadFont("https://rawalvarez731.github.io/WELOC___.ttf");
}

function setup()
{

	createCanvas(windowWidth, windowHeight);
}

function draw()
{
	background('#1E023F');
	textFont(coreyFont);
	text("O yeah", 10, 70);
}