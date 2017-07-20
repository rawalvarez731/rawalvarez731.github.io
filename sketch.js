/*
 * Richard Alvarez
 * Quick and dirty-ish
 */

'use strict';

const SQUIGLY_RADIUS = 20;
const SQUIGLY_SPEED = 1;
var tick, font;


function preload()
{
	font = loadFont("https://rawalvarez731.github.io/future.outrun-future-bold-italic.otf");
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function distance(x1, y1, x2, y2)
{
	return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

class Squigly
{
	constructor(x, y, type)
	{

		this.x = x;
		this.y = y;

		// Render strats
		let circleSquigly = function()
		{
			ellipse(this.x, this.y, SQUIGLY_RADIUS);
		};

		let lineSquigly = function()
		{
			beginShape();
			vertex(this.x + Math.cos(this.angleOne)*SQUIGLY_RADIUS, this.y + Math.sin(this.angleOne)*SQUIGLY_RADIUS);
			vertex(this.x, this.y);
			vertex(this.x + Math.cos(this.angleTwo)*SQUIGLY_RADIUS, this.y + Math.sin(this.angleTwo)*SQUIGLY_RADIUS);
			endShape();
		};


		if(type === "circle")
		{
			this.render = circleSquigly;
		}

		if(type === "line")
		{
			this.render = lineSquigly;
			this.angleOne = Math.random()*Math.PI*2;
			this.angleTwo = Math.random()*Math.PI*2;
			let d = distance(x + Math.cos(this.angleOne)*SQUIGLY_RADIUS, y + Math.sin(this.angleOne)*SQUIGLY_RADIUS,
						     x + Math.cos(this.angleTwo)*SQUIGLY_RADIUS, y + Math.sin(this.angleTwo)*SQUIGLY_RADIUS);
			while(d < 15)
			{
				this.angleOne = Math.random()*Math.PI*2;
				this.angleTwo = Math.random()*Math.PI*2;
				d = distance(x + Math.cos(this.angleOne)*SQUIGLY_RADIUS, y + Math.sin(this.angleOne)*SQUIGLY_RADIUS,
						     x + Math.cos(this.angleTwo)*SQUIGLY_RADIUS, y + Math.sin(this.angleTwo)*SQUIGLY_RADIUS);
			}
		}

	}
}

let nodes = [];
let squiglys = [];
function setup()
{
	createCanvas(windowWidth, windowHeight);	

	while(nodes.length < 200)
	{
		let x = getRandomArbitrary(SQUIGLY_RADIUS*3, windowWidth - SQUIGLY_RADIUS*3);
		let y = getRandomArbitrary(SQUIGLY_RADIUS*3, windowHeight - SQUIGLY_RADIUS*3);
		let valid = true;
		nodes.forEach((n)=>{
			if(distance(n.x, n.y, x, y) < SQUIGLY_RADIUS*3.5)
			{
				valid = false;
			}
		});
		if(valid){
			nodes.push({
				x: x,
				y: y
			});
		}else
		{
			continue;
		}
	}

	nodes.forEach((n)=>{
		squiglys.push(new Squigly(n.x, n.y, Math.random()<0.87?'line':'circle'));
	});
	
}
function draw()
{
	tick++;
	background('#040506');
	smooth();
	noFill();
	strokeWeight(2.0);
	stroke("white");
	rect(10, 10, windowWidth-20, windowHeight-20);
	strokeWeight(5.0);
	stroke("#EDDF46");
	squiglys.forEach((s)=>{
		s.render();
	});
	/*nodes.forEach((n)=>{
		smooth();
		noFill();
		stroke("red");
		strokeWeight(1.0);
		ellipse(n.x, n.y, SQUIGLY_RADIUS*3.5);
	});*/
	fill("#02AEF1").strokeWeight(0).textSize(100);
	textAlign('center');
	text("RICHARD ALVAREZ",windowWidth/2, windowHeight/2+25);
	fill("#ED208E").strokeWeight(0).textSize(100);
	textFont(font);
	textAlign('center');
	text("RICHARD ALVAREZ",windowWidth/2, windowHeight/2);
	fill(255).strokeWeight(0).textSize(45);
	textFont(font);
	textAlign('center');
	text("80s DREAM MACHINE",windowWidth/2, windowHeight/2+150);
}

