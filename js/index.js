
let canvas;
let context;
let keyboard = [];
let mouse = {};
let particles = [];

let timer = 0;
let cooldown = 0.5;

window.onload = init;
window.onresize = resize;
window.onkeydown = keydown;
window.onkeyup = keyup;
window.onmousemove = mousemove;
window.onmouseup = mouseup;
window.onmousedown = mousedown;

function init() {
	canvas = document.getElementById('viewport');
	context = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	requestAnimationFrame(loop);
}

function loop() {
	context.fillStyle = 'black';
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(0, 0, canvas.width, canvas.height);

	timer += 0.1;
	if (timer > cooldown && mouse.down) {
		rocket(mouse.x, mouse.y);
		timer = 0;
	}

	for (var i = particles.length - 1; i >= 0; i--) {
		let p = particles[i];
		p.move();
		p.draw(context);
		p.color.a -= Math.random() * 0.01;

		if (p.color.a < 0 ||
			p.x + p.radius < 0 ||
			p.y + p.radius < 0 ||
			p.x - p.radius > canvas.width ||
			p.y - p.radius > canvas.height) {
			p.die()
			particles.splice(i, 1);
		}
	}

	// console.log(particles.length);
	requestAnimationFrame(loop);
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function keydown(e) {
	keyboard[e.keyCode] = true;
}

function keyup(e) {
	keyboard[e.keyCode] = false;
}

function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;
}

function mousedown() {
	mouse.down = true;
}

function mouseup() {
	mouse.down = false;
}

function radians(d) {
	return d * (Math.PI / 180);
}

function randi(min, max) {  
	return Math.random() * (max - min) + min; 
}

function explosion(x, y, color) {
	for (let i = 0; i < 360; i += 15) {
		particles.push(new Snow.PolarParticle(
			x,
			y,
			randi(5, 10),
			new Snow.RGBAValue(
				color.r,
				color.g,
				color.b,
				1.0),
			10,
			i,
		));
	}
}

function rocket(x, y) {
	particles.push(new Rocket(x, y));
}

class Rocket extends Snow.VectorParticle {
	constructor(x, y) {
		super(
			x,
			y,
			10,
			new Snow.RGBAValue(
				255,
				255,
				255,
				1.0),
			0,
			-1
		);
	}

	move() {
		this.color.a -= 0.02;
		this.velY -= 0.4;
		this.x += this.velX;
		this.y += this.velY;
	}

	die() {
		explosion(this.x, this.y, new Snow.RGBValue(
			randi(0, 255),
			randi(0, 255),
			randi(0, 255)
		));
	}
}