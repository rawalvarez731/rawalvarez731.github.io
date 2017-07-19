'use strict';

let capture;
let coreyFont;

function preload()
{
	coreyFont = loadFont("https://rawalvarez731.github.io/WELOC___.TTF");
}

function setup()
{

	createCanvas(windowWidth, windowHeight);
}

function draw()
{
	background('#1E023F');
	fill(255).strokeWeight(0).textSize(150);
	textFont(coreyFont);
	textAlign('center');
	text("fucku",windowWidth/2, windowHeight/2);
}