/*
 * Richard Alvarez
 * Quick and dirty-ish
 */

/* TODO
	- Particles
	- Bullets
	- Asteroids? Just general baddies.

*/

'use strict';

var GRAVITY;

function Firestone()
{	
	this.scaleSmall = height*0.01;
	this.scaleBig = height*0.07;

	this.angle = 0;

	this.position = createVector(random(0, width),random(0, height));
	this.velocity  =  p5.Vector.random2D();
	this.acceleration = createVector(0);

	this.size = random(this.scaleSmall, this.scaleBig);
	this.points = floor(random(5, 15));
	this.v = [];

	this.mass = map(this.size, this.scaleSmall, this.scaleBig, 1, 10);

	for(let i = 0; i < this.points; i++)
	{
		let angle = map(i, 0, this.points, 0, TWO_PI);
		var x = (random(-this.scaleSmall, this.scaleBig) + this.size) * cos(angle);
		var y = (random(-this.scaleSmall, this.scaleBig) + this.size) * sin(angle);
		this.v.push(createVector(x, y));
	}
	
	this.hits = function(firestone)
	{
		let d = dist(this.position.x, this.position.y, firestone.position.x, firestone.position.y);
		if(d < firestone.size + this.size)
		{
			return true;
		}else
		{
			return false;
		}
	}

	this.hitPlayer = function(player)
	{
		// explosion.
		let d = dist(this.position.x, this.position.y, player.pos.x, player.pos.y);
		if(d < sqrt((player.SCALE_WIDTH**2)+(player.SCALE_HEIGHT**2))/2 + this.size)
		{
			return true;
		}
		else
		{
			return false;
		}

	}

	this.applyforce = function(force)
	{
		let f = p5.Vector.div(force, this.mass);
		this.acceleration.add(f);
	}

	this.update = function()
	{
		let friction = this.velocity.copy();
		friction.mult(-1);
		friction.normalize();
		friction.mult(0.01);

		this.applyforce(friction);
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);

		this.acceleration.mult(0);

		this.angle+=map(this.mass, 1, 10, 3, 0.1);
	}

	this.draw = function()
	{
		push();
		stroke([242, 66, 19]);
		strokeWeight(6.0);
		noFill();
		translate(this.position.x, this.position.y);
		rotate(radians(this.angle));
		beginShape();
		this.v.forEach((vv)=>vertex(vv.x, vv.y));
		endShape(CLOSE);
		pop();
/*		push();
		translate(this.position.x, this.position.y);
		stroke(255);
		fill(255);
		strokeWeight(1);
		text(this.mass, 0, 0);
		text(this.velocity.y, 0, 10);
		pop();*/
	}

}

function preload()
{
	PLAYER_TILESHEET = loadImage("assets/player.png");
}

var firestones = [];
var player;
function setup()
{

	GRAVITY = createVector(0,0.05);

	createCanvas(windowWidth, windowHeight);
	frameRate(60);
	imageMode(CENTER);
	for(let i = 0; i < 2; i++)
	{
		firestones.push(new Firestone());
	}
	player = new Player();
}

function draw()
{
	background(7);

	firestones.forEach((f)=>{
		if(f.position.y>height||f.position.y<0||f.position.x<0||f.position.x<width)
		{
			firestones.push(new Firestone());	
			firestones.push(new Firestone());
			firestones.splice(firestones.indexOf(f), 1);
			return;
		}
		if(f.hitPlayer(player))
		{
			firestones.splice(firestones.indexOf(f), 1);
		};
		firestones.forEach((fp)=>{
			if(f.hits(fp) && f != fp)
			{
				console.log('hit');
				let xO;
				if(f.position.x < fp.position.x){
					xO = -1;
				}else
				{
					xO = 1;
				}

				f.applyforce(createVector(xO, 0));
				fp.applyforce(createVector(-xO, 0));
			}
		});
		f.update();
		f.draw();
	});

	player.update();
	player.draw();
	player.handlePressedKeyboard();
}

function keyReleased()
{
	player.handleReleasedKeyboard();
}

function keyPressed()
{
	player.keyPressed();
}
