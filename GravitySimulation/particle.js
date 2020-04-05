import * as helpers from "../Utils/helpers.js";
import Vector2D from "../Utils/Vector2D.js";

export default class Particle {
	constructor(position, velocity, radius = 3, mass = 1) {
		this._position = new Vector2D(position.x, position.y);
		this._velocity = new Vector2D(velocity.x, velocity.y);
		this._radius = radius;
		this._mass = mass;
	}

	get position() {
		return this._position;
	}

	set position(newPosVec) {
		this._position = new Vector2D(newPosVec.x, newPosVec.y);
	}

	get velocity() {
		return this._velocity;
	}

	set velocity(newVelocityVec) {
		this._velocity = new Vector2D(newVelocityVec.x, newVelocityVec.y);
	}

	get mass() {
		return this._mass;
	}

	set mass(newMass) {
		this._mass = newMass;
	}

	get radius() {
		return this._radius;
	}

	set radius(newRadius) {
		this._radius = newRadius;
	}

	CollidedWith(otherParticle) {
		if (this.position.DistanceTo(otherParticle.position) <= this.radius + otherParticle.radius) {
			return true;
		} else {
			return false;
		}
	}

	Draw(context, strokeStyle, fillStyle) {
		context.beginPath();
		context.fillStyle = fillStyle;
		context.strokeStyle = strokeStyle;
		context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		context.stroke();
		context.fill();
	}

	DeepCopy() {
		let particle = new Particle(
			new Vector2D(this.position.x, this.position.y),
			new Vector2D(this.velocity.x, this.velocity.y),
			this.radius,
			this.mass
		);
		return particle;
	}

	static GenerateRandomParticle(
		xPosMin,
		xPosMax,
		yPosMin,
		yPosMax,
		vxMin,
		vxMax,
		vyMin,
		vyMax,
		radiusMin,
		radiusMax,
		massMin,
		massMax
	) {
		return new Particle(
			new Vector2D(
				helpers.GetRandomGaussianNormal_BoxMuller(xPosMin, xPosMax, 1),
				helpers.GetRandomGaussianNormal_BoxMuller(yPosMin, yPosMax, 1)
			),
			new Vector2D(
				helpers.GetRandomGaussianNormal_BoxMuller(vxMin, vxMax, 1),
				helpers.GetRandomGaussianNormal_BoxMuller(vyMin, vyMax, 1)
			),
			helpers.GetRandomGaussianNormal_BoxMuller(radiusMin, radiusMax, 1),
			helpers.GetRandomGaussianNormal_BoxMuller(massMin, massMax, 1)
		);
	}

	Overlaps(otherParticle) {
		return this.position.DistanceTo(otherParticle.position) < this.radius + otherParticle.radius;
	}

	static GenerateNRandomParticles(
		N,
		xPosMin,
		xPosMax,
		yPosMin,
		yPosMax,
		vxMin,
		vxMax,
		vyMin,
		vyMax,
		radiusMin,
		radiusMax,
		massMin,
		massMax
	) {
		let particles = [];
		let i = 0;
		while (i < N) {
			let particle = this.GenerateRandomParticle(
				xPosMin,
				xPosMax,
				yPosMin,
				yPosMax,
				vxMin,
				vxMax,
				vyMin,
				vyMax,
				radiusMin,
				radiusMax,
				massMin,
				massMax
			);
			// check if no other particle overlap with the to be added particle
			let twoParticlesOverlap = false;
			for (let j = 0; j < particles.length; j++) {
				if (particle.Overlaps(particles[j])) {
					twoParticlesOverlap = true;
					break;
				}
			}
			if (!twoParticlesOverlap) {
				particles.push(particle);
				i++;
			}
		}
		return particles;
	}
}
