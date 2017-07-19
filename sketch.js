'use strict';

let capture;
let coreyFont;

function preload()
{
	coreyFont = loadFont("https://rawalvarez731.github.io/WELOC___.TTF");
}

function squigly(x, y, angle1, angle2)
{
	smooth();
	noFill();
	strokeWeight(3.0);
	stroke("#EDDF46");
	strokeJoin(MITER);
	beginShape();
	vertex(x + Math.cos(angle1)*20, y + Math.sin(angle1)*20);
	vertex(x, y);
	vertex(x + Math.cos(angle2)*20, y + Math.sin(angle2)*20);
	endShape();
}

function circle(x, y)
{
	smooth();
	noFill();
	strokeWeight(3.0);
	stroke("#EDDF46");
	ellipse(x, y, 20);	
}

let squiglys = [];
let circles  = [];
function setup()
{
	createCanvas(windowWidth, windowHeight);	
	for(let i = 0; i < 125; i++){
		squiglys.push({
			x: Math.floor(Math.random()*windowWidth - 50) + 50,
			y: Math.floor(Math.random()*windowHeight - 50) + 50,
			angle1: Math.random()*Math.PI*2,
			angle2: Math.random()*Math.PI*2
		});
		circles.push({
			x: Math.floor(Math.random()*windowWidth - 50) + 50,
			y: Math.floor(Math.random()*windowHeight - 50) + 50
		});
	}
}

function draw()
{
	background('#040506');
	squiglys.forEach((s)=>{
		squigly(s.x, s.y, s.angle1, s.angle2);
	});
	circles.forEach((c)=>{
		circle(c.x, c.y);
	});
	fill(255).strokeWeight(0).textSize(150);
	textFont(coreyFont);
	textAlign('center');
	text("fucku",windowWidth/2, windowHeight/2);
}