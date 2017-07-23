'use strict';

var PLAYER_TILESHEET;
const PLAYER_IMAGE_WIDTH  = 64;
const PLAYER_IMAGE_HEIGHT = 64;

function Player()
{

	this.angle = 0;
	this.angleOff = 0; 
	this.currentFrame = 0;
	
	this.SCALE_WIDTH = width*0.04;
	this.SCALE_HEIGHT = height*0.07;

	this.mass = 1; 
	this.pos = createVector(width/2, height/2);
	this.vel = createVector(0);
	this.acc = createVector(0);

	this.history = [];

	this.animate = false;

	this.applyforce = function(force)
	{
		let f = p5.Vector.div(force, this.mass);
		this.acc.add(f);
	}


	this.update = function()
	{

		if(player.pos.x < 0)
		{
			player.pos.x = width;
		}else if(player.pos.x > width)
		{
			player.pos.x = 0;
		}

		if(player.pos.y < 0)
		{
			player.pos.y = height;
		}else if(player.pos.y > width)
		{
			player.pos.y = 0;
		}

		// Appply forces to position etc...

		let friction = this.vel.copy();
		friction.mult(-1);
		friction.normalize();
		friction.mult(0.25);

		this.applyforce(friction);
		this.vel.add(this.acc);
		this.pos.add(this.vel);

		this.acc.mult(0);

		// Calculate angle
		this.angle += this.angleOff;

		// Animate
		if(this.animate)
		{
			if(!(frameCount%3)){
				this.history.push({p: createVector(this.pos.x, this.pos.y), tick: 15});
			}

			// For every 6 frames animate
			if(!(frameCount%6))
			{
				this.currentFrame++;
			}
			if(this.currentFrame==4)
			{
				this.animate=false;
				this.currentFrame=0;
			} 
		}
	}

	this.draw = function()
	{

		push();
		translate(this.pos.x, this.pos.y);
		rotate(radians(this.angle));
		tint([190, 222, 44]);
		image(PLAYER_TILESHEET, 0, 0,
					    this.SCALE_WIDTH,
					    this.SCALE_HEIGHT,  
					    PLAYER_IMAGE_WIDTH*this.currentFrame, 0, 
					    PLAYER_IMAGE_WIDTH-2,PLAYER_IMAGE_HEIGHT-5);
		pop();

		let i = 0;
		let playercolors = [[190, 222, 44],
					 	    [49, 162, 238], 
					 	    [184, 37, 53], 
					 	    [173, 81, 185]];
		this.history.forEach((p)=>{
			//min+=255/this.history.length;
			p.tick--;
			if(p.tick == 0)
			{
				this.history.splice(this.history.indexOf(p), 1);
			}
			push();
			let c = playercolors[i%4];
			c.push(map(p.tick, 0, 15, 0, 255))
			tint(c);
			translate(p.p.x, p.p.y);
			rotate(radians(this.angle));
			image(PLAYER_TILESHEET, 0, 0,
						    this.SCALE_WIDTH,
						    this.SCALE_HEIGHT, 
						    PLAYER_IMAGE_WIDTH*this.currentFrame, 0, 
						    PLAYER_IMAGE_WIDTH-2,PLAYER_IMAGE_HEIGHT-5);
			pop();
			i++;
		});
	}

	this.keyPressed = function()
	{
		if(keyCode == 32){
			this.animate = true;
			this.applyforce(createVector(Math.cos(radians(this.angle+270))*12, Math.sin(radians(this.angle+270))*12));
		}
	}

	this.handlePressedKeyboard = function()
	{
		if(keyIsDown(RIGHT_ARROW) || keyIsDown(68))
		{
			this.angleOff = 4;
		}
		if(keyIsDown(LEFT_ARROW) || keyIsDown(65))
		{
			this.angleOff = -4;
		}
	}

	this.handleReleasedKeyboard = function()
	{
		this.angleOff = 0;
	}


}
