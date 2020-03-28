
let canvas;
let context;
let mouse = {};
let keyboard = [];
let entities = [];

window.onload = init;
window.onresize = resize;
window.onkeydown = keydown;
window.onkeyup = keyup;

function init() {
	canvas = document.getElementById('viewport');
	context = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.onmousemove = mousemove;
	canvas.onmousedown = mousedown;
	canvas.onmouseup = mouseup;
	requestAnimationFrame(loop);
}

let timer = 0;
let cooldown = 2;

function loop() {
	context.fillStyle = 'black';
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(0, 0, canvas.width, canvas.height);

	timer += 1;
	if (mouse.down && timer > cooldown) {
		for (let i = 0; i < 360; i += 15) {
			entities.push(new Particle(
				mouse.x,
				mouse.y,
				10,
				randi(1, 10),
				radians(i),
				[255, randi(0, 255), 0, 1],
				randf(0.01, 0.1)
			));
		}
		timer = 0;
	}

	entities.forEach((value, index, array) => {
		value.update();
		value.render(context);

		value.color[3] -= value.decay;
		if (value.color[3] < 0) value.alive = false;

		if (value.x < 0) value.alive = false;
		if (value.y < 0) value.alive = false;
		if (value.x > canvas.width) value.alive = false;
		if (value.y > canvas.height) value.alive = false;

		if (!value.alive) array.splice(index, 1);
	});
	context.fillStyle = 'white';
	context.font = '20px montserrat';
	context.fillText('This is for you Peng <3', 15, canvas.height - 20);
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

function randi(a, b) {
	return Math.floor(Math.random() * (b - a) + a);
}

function randf(a, b) {
	return Math.random() * (b - a) + a;
}

function str(color) {
	return `rgb(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
}

function np() {
	return Math.random() < 0.5 ? 1 : -1;
}

function radians(d) {
	return d * (Math.PI / 180);
}


class Entity {
	constructor (x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = [255, 255, 255];
		this.alive = true;
	}

	draw(c) {
		c.fillStyle = str(this.color);
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.fill();
	}

	die() {}
}

class Particle extends Entity {
	constructor(x, y, radius, vel, theta, color, decay) {
		super(x, y, radius);
		this.vel = vel;
		this.velX = Math.cos(theta) * this.vel;
		this.velY = Math.sin(theta) * this.vel;
		this.color = color;
		this.decay = decay;
	}

	move() {
		this.x += this.velX;
		this.y += this.velY;
	}

	update() {
		this.move();
	}

	render(c) {
		this.draw(c);
	}
}
