
let Snow = {};

Snow.RGBValue = class {
	constructor(r = 255, g = 255, b = 255) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	toString() {
		return `rgb(
			${this.r},
			${this.g},
			${this.b})`;
	}
}

Snow.RGBAValue = class {
	constructor(r = 255, g = 255, b = 255, a = 1) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	toString() {
		return `rgba(
			${this.r},
			${this.g},
			${this.b},
			${this.a})`;
	}
}

Snow.Particle = class {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.alive = true;
	}

	move() {}

	draw(c) {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		c.fillStyle = this.color.toString();
		c.fill();
	}

	die() {}
}

Snow.VectorParticle = class extends Snow.Particle {
	constructor(x, y, radius, color, velX, velY) {
		super(x, y, radius, color);
		this.velX = velX;
		this.velY = velY;
	}

	move() {
		this.x += this.velX;
		this.y += this.velY;
	}
}

Snow.PolarParticle = class extends Snow.Particle {
	constructor(x, y, radius, color, vel, angle) {
		super(x, y, radius, color);
		this.vel = vel;
		this.angle = angle;
	}

	move() {
		this.x += Math.cos(this.angle) * this.vel;
		this.y += Math.sin(this.angle) * this.vel;
	}
}