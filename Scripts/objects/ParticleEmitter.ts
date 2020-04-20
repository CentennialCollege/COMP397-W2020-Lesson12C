module objects
{
    export class ParticleEmitter extends createjs.Container
    {
        private _position:Vector2;
        private _emissionAngle : number;

        // PUBLIC INSTANCE VARIABLES
        public particles: Array<objects.Particle>;
        public particleNumber: number;
        public emissionTime: number = 0;
        public timeRemaining: number = 0;
        public repeatNumber: number = 1;

        public rotationalVelocity: number;
        public emitterOffset: objects.Vector2;
        public emissionShape: enums.EmissionShape;
        public emissionRate: number = 10.0; // particles per frame

        // Emisson Shape Variables
        public emissionSize: objects.Vector2;
        public emissionRadius: number = 10.0;
        public arcTopRight: objects.Vector2;
        public arcTopLeft: objects.Vector2;
        public arcRadius: number = 200.0; // distance from the emitter origin
        public emissionArc: number = 60.0 // the width of the arc

        public get emissionDirection() : number
        {
            return this._emissionAngle;
        }

        public set emissionDirection(v : number)
        {
            this._emissionAngle = v;
            this.rotation = (v + 90) * -1.0 ;
        }

        // Emitter Playback variables
        public deltaTime:number = 0.166667;
        public isPlaying: boolean = true;
        public isLooping: boolean = true;
        public loopDelay: number = 0.0;
        public duration: number = -1.0;  // negative duration means infinite

        // default particle settings
        public limitSpeedOverLifetime: boolean = false;
        public initialSpeedLimitRange: objects.Vector2 = new objects.Vector2();
        public finalSpeedLimitRange: objects.Vector2 = new objects.Vector2();

        public initialSpeedRange: objects.Vector2;

        public lifeRange: objects.Vector2;

        public isSizeChangingOverLifetime: boolean = false;
        public particleSize: number;
        public sizeRangeBegin: objects.Vector2;
        public sizeRangeEnd: objects.Vector2;
        public massRange: objects.Vector2;

        public isSpinChangingOverLifetime: boolean = false;
        public spinRangeBegin: objects.Vector2;
        public spinRangeEnd: objects.Vector2;

        public isColourChangingOverLifetime: boolean = false;
        public particleColor: objects.Color;
        public colourBegin0: objects.Color;
        public colourBegin1: objects.Color;

        public colourEnd0: objects.Color;
        public colourEnd1: objects.Color;

        public particleShape: enums.ParticleShape;

        get position():Vector2
        {
            return this._position;
        }

        set position(newPosition:Vector2)
        {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }


        // CONSTRUCTOR
        constructor(
            particleShape:enums.ParticleShape = enums.ParticleShape.CIRCLE,
            particleSize:number = 20,
            particleColor:objects.Color = objects.Color.Red(),
            emissionShape: enums.EmissionShape = enums.EmissionShape.CIRCLE,
            numberOfParticles: number = 50, emissionRate:number = 10)
        {
            super();

            // basic configuration
            this.particleShape = particleShape;
            this.particleSize = particleSize;
            this.particleColor = particleColor;
            this.emissionShape = emissionShape;
            this.particleNumber = numberOfParticles;
            this.emissionRate = emissionRate;
            this.initialize(numberOfParticles);
        }

        // PRIVATE METHODS


        // PUBLIC METHODS
        public initialize(numberOfParticles: number)
        {
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
            this.sizeRangeBegin =new objects.Vector2(10.0, 20.0);
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

        }

        public freeMemory(): void
        {
            if(this.particles)
            {
                this.removeAllChildren();

                delete this.particles;
                this.particles = null;
                this.particleNumber = 0;
            }
        }

        public buildEmitter(numberOfParticles: number)
        {
            if(numberOfParticles > 0)
            {
                // create an empty array container
                this.particles = new Array<objects.Particle>();
                this.particleNumber  = numberOfParticles;
            }

            for(let index = 0; index < this.particleNumber; index++)
            {
                let particle = new objects.Particle(this.particleShape, this.particleColor, this.particleSize);
                this.particles.push(particle);
            }
        }

        public Update():void
        {
            this.rotation += this.rotationalVelocity;

            this.deltaTime = createjs.Ticker.interval * 0.01;
            if(this.particles && this.isPlaying)
            {

                this.emissionTime += this.deltaTime
                this.timeRemaining -= this.deltaTime;
                if(this.timeRemaining < 0.0)
                {
                    if(this.duration > 0.0)
                    {
                        this.emissionTime = 0.0;
                        if(this.isLooping)
                        {
                            if(this.timeRemaining < -this.loopDelay)
                            {
                                this.killParticles();
                                this.removeAllChildren();
                                this.timeRemaining = this.duration;
                            }
                        }
                        else
                        {
                            if(this.repeatNumber > 0.0)
                            {
                                this.timeRemaining = this.duration;
                                this.repeatNumber--;
                            }
                            else
                            {
                                this.emissionTime = 0.0;
                            }
                        }
                    }
                }

                let numParticlesToEmit:number = this.emissionTime * this.emissionRate;

                // loop through each particle to emit
                this.particles.forEach(particle => {
                    if((particle.life <= 0.0) && (numParticlesToEmit > 0))
                    {
                        // spawn a particle
                        this.spawnParticle(particle);
                        numParticlesToEmit--;
                        this.emissionTime -= (1.0 / this.emissionRate);

                        // update each particle
                        this.UpdateParticle(particle);

                    }
                    else
                    {
                        if(particle)
                        {
                            // update the particle
                            this.UpdateParticle(particle);
                        }
                    }
                });

            }
        }

        public killParticles():void
        {
            this.particles.forEach(particle => {
                particle.life = -1;
            });
        }

        public spawnParticle(particle: objects.Particle):void
        {
            particle.colourBegin = util.Mathf.LerpColor(this.colourBegin0, this.colourBegin1, Math.random());
            particle.colourEnd = util.Mathf.LerpColor(this.colourEnd0, this.colourEnd1, Math.random());

            particle.lifespan = util.Mathf.Lerp(this.lifeRange.x, this.lifeRange.y, Math.random());
            particle.life = particle.lifespan

            // couple mass and size relationship
            let randomTVal_A = Math.random();
            particle.mass = util.Mathf.Lerp(this.massRange.x, this.massRange.y, randomTVal_A);
            particle.sizeBegin = util.Mathf.Lerp(this.sizeRangeBegin.x, this.sizeRangeBegin.y, randomTVal_A);
            particle.sizeEnd = util.Mathf.Lerp(this.sizeRangeEnd.x, this.sizeRangeEnd.y, randomTVal_A);

            // emission shapes determine initial velocity and position distribution

//#region Emit From Shape
            switch(this.emissionShape)
            {
                case enums.EmissionShape.RECTANGLE:
                    {
                        let pos: objects.Vector2 = new objects.Vector2();
                        pos.x = util.Mathf.RandomRange((-this.emissionSize.x * 0.5) + (particle.size * 0.5),
                            this.emissionSize.x - particle.size);
                        pos.y = 0;// util.Mathf.RandomRange(this.rectangleSize.y * -0.5, this.rectangleSize.y * 0.5);

                        particle.x = pos.x;
                        particle.y = pos.y;

                        particle.velocity = new Vector2(0.0, 2.0);
                    }
                    break;
                case enums.EmissionShape.CIRCLE:
                    {
                        particle.x = 0;
                        particle.y = 0;

                        let randomAngle = util.Mathf.RandomRange(0.0, 360) * 0.0174532;
                        let randomSpeed = util.Mathf.RandomRange(1.0, 2.0);
                        let direction = new objects.Vector2();
                        direction.x = randomSpeed * Math.cos(randomAngle);
                        direction.y = randomSpeed * Math.sin(randomAngle);

                        particle.velocity = direction;
                    }
                    break;
                case enums.EmissionShape.ARC:
                    {
                        particle.x = 0;
                        particle.y = 0;

                        let halfArc = (this.emissionArc * 0.5);
                        let offset = 90.0 // compensate for emessionAngle
                        let randomAngle = (util.Mathf.RandomRange(-halfArc + offset, halfArc + offset))
                        let randomSpeed = util.Mathf.RandomRange(1.0, 2.0);
                        let direction = new objects.Vector2();
                        direction.x = randomSpeed * (Math.cos(randomAngle * 0.0174532));
                        direction.y = randomSpeed * (Math.sin(randomAngle * 0.0174532));

                        particle.velocity = direction;
                    }
                    break;
            }
//#endregion


            // emit functions will set a position and a normalized velocity
            let startSpeed = util.Mathf.RandomRange(this.initialSpeedRange.x, this.initialSpeedRange.y);
            particle.velocity.x *= startSpeed;
            particle.velocity.y *= startSpeed;

            particle.speedLimitBegin = util.Mathf.RandomRange(this.initialSpeedLimitRange.x, this.initialSpeedLimitRange.y);
            particle.speedLimitEnd = util.Mathf.RandomRange(this.finalSpeedLimitRange.x, this.finalSpeedLimitRange.y);

            particle.size = particle.sizeBegin;
            particle.color = util.Mathf.LerpColor(particle.colourBegin, particle.colourEnd, 0.5);
            this.addChildAt(particle, 0);
        }

        public UpdateParticle(particle: objects.Particle):void
        {
            if(!particle.lifespan)
            {
                particle.lifespan = 1.0;
            }

            let normalizedLife: number = util.Mathf.Clamp(1.0 - (particle.life / particle.lifespan), 0.0, 1.0);
            if(this.isSizeChangingOverLifetime)
            {
                let size = util.Mathf.Lerp(particle.sizeBegin, particle.sizeEnd, normalizedLife);
                particle.size = size;
            }

            if(this.limitSpeedOverLifetime)
            {
                let speed = util.Mathf.Lerp(particle.speedLimitBegin, particle.speedLimitEnd, normalizedLife);
                particle.velocity.x = util.Mathf.Clamp(particle.velocity.x, particle.velocity.x, speed);
                particle.velocity.y = util.Mathf.Clamp(particle.velocity.y, particle.velocity.y, speed);
            }

            if(this.isSpinChangingOverLifetime)
            {
                let rotationX = util.Mathf.Lerp(this.spinRangeBegin.x, this.spinRangeEnd.x, normalizedLife);
                particle.rotation += rotationX;
            }
            else
            {
                particle.rotation += util.Mathf.RandomRange(this.spinRangeBegin.x, this.spinRangeEnd.x);
            }

            if (this.isColourChangingOverLifetime) {

                if (!particle.colourBegin) {
                    particle.colourBegin = this.colourBegin0;
                    particle.colourEnd = this.colourEnd0;
                }
                let color = util.Mathf.LerpColor(particle.colourBegin, particle.colourEnd, normalizedLife);
                particle.color = color;
            }

            // move particle
            particle.x += particle.velocity.x * this.deltaTime;
            particle.y += particle.velocity.y * this.deltaTime;

            particle.life -= this.deltaTime;
            let particleDistance = objects.Vector2.distance(objects.Vector2.zero(), new objects.Vector2(particle.x, particle.y));

            /* POTENTIAL PARTICLE REMOVAL */
            switch(this.emissionShape)
            {
                case enums.EmissionShape.ARC:
                    if(particleDistance >= this.arcRadius)
                    {
                        particle.life = 0.0;
                        this.removeChild(particle);
                    }
                    break;
                case enums.EmissionShape.CIRCLE:
                    if( particleDistance >= this.emissionRadius)
                    {
                        particle.life = 0.0;
                        this.removeChild(particle);
                    }
                    break;
                case enums.EmissionShape.RECTANGLE:
                    if(particle.y <= -this.emissionSize.y)
                    {
                        particle.life = 0.0;
                        this.removeChild(particle);
                    }
                    break;
            }

            // update position
            particle.Update();

        }

    }
}
