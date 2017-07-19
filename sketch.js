'use strict';

let capture;

function setup()
{

	createCanvas(windowWidth, windowHeight);
	capture = createCapture({
    	audio: false,
    	video: {
      		facingMode: "user"
    	}
    });
	capture.size(320, 240);
	capture.hide();
}

function draw()
{
	background(255);
	image(capture, 0, 0, windowWidth, windowHeight);
}