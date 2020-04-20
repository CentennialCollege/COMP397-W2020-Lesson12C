"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var ParticleEmitter = /** @class */ (function (_super) {
        __extends(ParticleEmitter, _super);
        // CONSTRUCTOR
        function ParticleEmitter(particleShape, particleSize, particleColor, emissionShape, numberOfParticles, emissionRate) {
            if (particleShape === void 0) { particleShape = enums.ParticleShape.CIRCLE; }
            if (particleSize === void 0) { particleSize = 20; }
            if (particleColor === void 0) { particleColor = objects.Color.Red(); }
            if (emissionShape === void 0) { emissionShape = enums.EmissionShape.CIRCLE; }
            if (numberOfParticles === void 0) { numberOfParticles = 50; }
            if (emissionRate === void 0) { emissionRate = 10; }
            var _this = _super.call(this) || this;
            _this.emissionTime = 0;
            _this.timeRemaining = 0;
            _this.repeatNumber = 1;
            _this.emissionRate = 10.0; // particles per frame
            _this.emissionRadius = 10.0;
            _this.arcRadius = 200.0; // distance from the emitter origin
            _this.emissionArc = 60.0; // the width of the arc
            // Emitter Playback variables
            _this.deltaTime = 0.166667;
            _this.isPlaying = true;
            _this.isLooping = true;
            _this.loopDelay = 0.0;
            _this.duration = -1.0; // negative duration means infinite
            // default particle settings
            _this.limitSpeedOverLifetime = false;
            _this.initialSpeedLimitRange = new objects.Vector2();
            _this.finalSpeedLimitRange = new objects.Vector2();
            _this.isSizeChangingOverLifetime = false;
            _this.isSpinChangingOverLifetime = false;
            _this.isColourChangingOverLifetime = false;
            // basic configuration
            _this.particleShape = particleShape;
            _this.particleSize = particleSize;
            _this.particleColor = particleColor;
            _this.emissionShape = emissionShape;
            _this.particleNumber = numberOfParticles;
            _this.emissionRate = emissionRate;
            _this.initialize(numberOfParticles);
            return _this;
        }
        Object.defineProperty(ParticleEmitter.prototype, "emissionDirection", {
            get: function () {
                return this._emissionAngle;
            },
            set: function (v) {
                this._emissionAngle = v;
                this.rotation = (v + 90) * -1.0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleEmitter.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (newPosition) {
                this._position = newPosition;
                this.x = newPosition.x;
                this.y = newPosition.y;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        // PUBLIC METHODS
        ParticleEmitter.prototype.initialize = function (numberOfParticles) {
            /* BEGIN DEFAULT CONFIGURATION */
            this.freeMemory();
            this.buildEmitter(numberOfParticles);
            this.timeRemaining = this.duration;
            // paritcle properties
            this.particleShape = this.particleShape;
            //transformations
            this.rotation = 0; // per particle
            this.emissionDirection = 90;
            //emitter properties
            this.rotationalVelocity = 0;
            this.emitterOffset = new objects.Vector2();
            this.emissionDirection = 90.0;
            // shape properties
            this.emissionSize = new objects.Vector2(10.0, 10.0);
            // playback properties
            this.isPlaying = true;
            this.isLooping = true;
            this.loopDelay = 0.0;
            this.duration = -1;
            // speed options
            this.limitSpeedOverLifetime = true;
            this.initialSpeedRange = new objects.Vector2(10.0, 20.0);
            this.initialSpeedLimitRange = new objects.Vector2(20.0, 30.0);
            this.finalSpeedLimitRange = new objects.Vector2(5.0, 10.0);
            this.lifeRange = new objects.Vector2(4.0, 9.0);
            // size options
            this.isSizeChangingOverLifetime = true;
            this.sizeRangeBegin = new objects.Vector2(10.0, 20.0);
            this.sizeRangeEnd = new objects.Vector2(0.5, 1.0);
            this.massRange = new objects.Vector2(0.5, 1.0);
            // Rotation options
            this.isSpinChangingOverLifetime = true;
            this.spinRangeBegin = new objects.Vector2(-1, -1);
            this.spinRangeEnd = new objects.Vector2(1.0, 1.0);
            // Colour Options
            this.isColourChangingOverLifetime = true;
            this.colourBegin0 = objects.Color.Red();
            this.colourBegin1 = objects.Color.DarkOrange();
            this.colourEnd0 = objects.Color.Black();
            this.colourEnd1 = objects.Color.DarkGrey();
            // don't let tick propogate
            this.tickEnabled = false;
            this.tickChildren = false;
            /* END DEFAULT CONFIGURATION */
        };
        ParticleEmitter.prototype.freeMemory = function () {
            if (this.particles) {
                this.removeAllChildren();
                delete this.particles;
                this.particles = null;
                this.particleNumber = 0;
            }
        };
        ParticleEmitter.prototype.buildEmitter = function (numberOfParticles) {
            if (numberOfParticles > 0) {
                // create an empty array container
                this.particles = new Array();
                this.particleNumber = numberOfParticles;
            }
            for (var index = 0; index < this.particleNumber; index++) {
                var particle = new objects.Particle(this.particleShape, this.particleColor, this.particleSize);
                this.particles.push(particle);
            }
        };
        ParticleEmitter.prototype.Update = function () {
            var _this = this;
            this.rotation += this.rotationalVelocity;
            this.deltaTime = createjs.Ticker.interval * 0.01;
            if (this.particles && this.isPlaying) {
                this.emissionTime += this.deltaTime;
                this.timeRemaining -= this.deltaTime;
                if (this.timeRemaining < 0.0) {
                    if (this.duration > 0.0) {
                        this.emissionTime = 0.0;
                        if (this.isLooping) {
                            if (this.timeRemaining < -this.loopDelay) {
                                this.killParticles();
                                this.removeAllChildren();
                                this.timeRemaining = this.duration;
                            }
                        }
                        else {
                            if (this.repeatNumber > 0.0) {
                                this.timeRemaining = this.duration;
                                this.repeatNumber--;
                            }
                            else {
                                this.emissionTime = 0.0;
                            }
                        }
                    }
                }
                var numParticlesToEmit_1 = this.emissionTime * this.emissionRate;
                // loop through each particle to emit
                this.particles.forEach(function (particle) {
                    if ((particle.life <= 0.0) && (numParticlesToEmit_1 > 0)) {
                        // spawn a particle
                        _this.spawnParticle(particle);
                        numParticlesToEmit_1--;
                        _this.emissionTime -= (1.0 / _this.emissionRate);
                        // update each particle
                        _this.UpdateParticle(particle);
                    }
                    else {
                        if (particle) {
                            // update the particle
                            _this.UpdateParticle(particle);
                        }
                    }
                });
            }
        };
        ParticleEmitter.prototype.killParticles = function () {
            this.particles.forEach(function (particle) {
                particle.life = -1;
            });
        };
        ParticleEmitter.prototype.spawnParticle = function (particle) {
            particle.colourBegin = util.Mathf.LerpColor(this.colourBegin0, this.colourBegin1, Math.random());
            particle.colourEnd = util.Mathf.LerpColor(this.colourEnd0, this.colourEnd1, Math.random());
            particle.lifespan = util.Mathf.Lerp(this.lifeRange.x, this.lifeRange.y, Math.random());
            particle.life = particle.lifespan;
            // couple mass and size relationship
            var randomTVal_A = Math.random();
            particle.mass = util.Mathf.Lerp(this.massRange.x, this.massRange.y, randomTVal_A);
            particle.sizeBegin = util.Mathf.Lerp(this.sizeRangeBegin.x, this.sizeRangeBegin.y, randomTVal_A);
            particle.sizeEnd = util.Mathf.Lerp(this.sizeRangeEnd.x, this.sizeRangeEnd.y, randomTVal_A);
            // emission shapes determine initial velocity and position distribution
            //#region Emit From Shape
            switch (this.emissionShape) {
                case enums.EmissionShape.RECTANGLE:
                    {
                        var pos = new objects.Vector2();
                        pos.x = util.Mathf.RandomRange((-this.emissionSize.x * 0.5) + (particle.size * 0.5), this.emissionSize.x - particle.size);
                        pos.y = 0; // util.Mathf.RandomRange(this.rectangleSize.y * -0.5, this.rectangleSize.y * 0.5);
                        particle.x = pos.x;
                        particle.y = pos.y;
                        particle.velocity = new objects.Vector2(0.0, 2.0);
                    }
                    break;
                case enums.EmissionShape.CIRCLE:
                    {
                        particle.x = 0;
                        particle.y = 0;
                        var randomAngle = util.Mathf.RandomRange(0.0, 360) * 0.0174532;
                        var randomSpeed = util.Mathf.RandomRange(1.0, 2.0);
                        var direction = new objects.Vector2();
                        direction.x = randomSpeed * Math.cos(randomAngle);
                        direction.y = randomSpeed * Math.sin(randomAngle);
                        particle.velocity = direction;
                    }
                    break;
                case enums.EmissionShape.ARC:
                    {
                        particle.x = 0;
                        particle.y = 0;
                        var halfArc = (this.emissionArc * 0.5);
                        var offset = 90.0; // compensate for emessionAngle
                        var randomAngle = (util.Mathf.RandomRange(-halfArc + offset, halfArc + offset));
                        var randomSpeed = util.Mathf.RandomRange(1.0, 2.0);
                        var direction = new objects.Vector2();
                        direction.x = randomSpeed * (Math.cos(randomAngle * 0.0174532));
                        direction.y = randomSpeed * (Math.sin(randomAngle * 0.0174532));
                        particle.velocity = direction;
                    }
                    break;
            }
            //#endregion
            // emit functions will set a position and a normalized velocity
            var startSpeed = util.Mathf.RandomRange(this.initialSpeedRange.x, this.initialSpeedRange.y);
            particle.velocity.x *= startSpeed;
            particle.velocity.y *= startSpeed;
            particle.speedLimitBegin = util.Mathf.RandomRange(this.initialSpeedLimitRange.x, this.initialSpeedLimitRange.y);
            particle.speedLimitEnd = util.Mathf.RandomRange(this.finalSpeedLimitRange.x, this.finalSpeedLimitRange.y);
            particle.size = particle.sizeBegin;
            particle.color = util.Mathf.LerpColor(particle.colourBegin, particle.colourEnd, 0.5);
            this.addChildAt(particle, 0);
        };
        ParticleEmitter.prototype.UpdateParticle = function (particle) {
            if (!particle.lifespan) {
                particle.lifespan = 1.0;
            }
            var normalizedLife = util.Mathf.Clamp(1.0 - (particle.life / particle.lifespan), 0.0, 1.0);
            if (this.isSizeChangingOverLifetime) {
                var size = util.Mathf.Lerp(particle.sizeBegin, particle.sizeEnd, normalizedLife);
                particle.size = size;
            }
            if (this.limitSpeedOverLifetime) {
                var speed = util.Mathf.Lerp(particle.speedLimitBegin, particle.speedLimitEnd, normalizedLife);
                particle.velocity.x = util.Mathf.Clamp(particle.velocity.x, particle.velocity.x, speed);
                particle.velocity.y = util.Mathf.Clamp(particle.velocity.y, particle.velocity.y, speed);
            }
            if (this.isSpinChangingOverLifetime) {
                var rotationX = util.Mathf.Lerp(this.spinRangeBegin.x, this.spinRangeEnd.x, normalizedLife);
                particle.rotation += rotationX;
            }
            else {
                particle.rotation += util.Mathf.RandomRange(this.spinRangeBegin.x, this.spinRangeEnd.x);
            }
            if (this.isColourChangingOverLifetime) {
                if (!particle.colourBegin) {
                    particle.colourBegin = this.colourBegin0;
                    particle.colourEnd = this.colourEnd0;
                }
                var color = util.Mathf.LerpColor(particle.colourBegin, particle.colourEnd, normalizedLife);
                particle.color = color;
            }
            // move particle
            particle.x += particle.velocity.x * this.deltaTime;
            particle.y += particle.velocity.y * this.deltaTime;
            particle.life -= this.deltaTime;
            var particleDistance = objects.Vector2.distance(objects.Vector2.zero(), new objects.Vector2(particle.x, particle.y));
            /* POTENTIAL PARTICLE REMOVAL */
            switch (this.emissionShape) {
                case enums.EmissionShape.ARC:
                    if (particleDistance >= this.arcRadius) {
                        particle.life = 0.0;
                        this.removeChild(particle);
                    }
                    break;
                case enums.EmissionShape.CIRCLE:
                    if (particleDistance >= this.emissionRadius) {
                        particle.life = 0.0;
                        this.removeChild(particle);
                    }
                    break;
                case enums.EmissionShape.RECTANGLE:
                    if (particle.y <= -this.emissionSize.y) {
                        particle.life = 0.0;
                        this.removeChild(particle);
                    }
                    break;
            }
            // update position
            particle.Update();
        };
        return ParticleEmitter;
    }(createjs.Container));
    objects.ParticleEmitter = ParticleEmitter;
})(objects || (objects = {}));
//# sourceMappingURL=ParticleEmitter.js.map