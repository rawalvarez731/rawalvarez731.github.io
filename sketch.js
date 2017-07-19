'use strict';

let capture;

function setup()
{

	createCanvas(windowWidth, windowHeight);
	capture = createCapture(VIDEO);
	capture.size(320, 240);
}

function draw()
{
	background(255);
	image(capture, 0, 0, windowWidth, windowHeight);
}