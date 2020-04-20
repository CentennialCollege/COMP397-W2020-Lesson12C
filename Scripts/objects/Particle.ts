module objects
{
    export class Particle extends createjs.Shape
    {
        // Private Instance Variables
        private _size : number;

        // PUBLIC INSTANCE VARIABLES

        public get size() : number {
            return this._size;
        }

        public set size(v : number) {
            this._size = v;
            this._initialize();
        }


        // Physical Properties
        public velocity: util.Vector2 = new util.Vector2();
        public acceleration: util.Vector2 = new util.Vector2();
        public force: util.Vector2 = new util.Vector2();
        public mass: number = 1.0;

        public sizeBegin: number;
        public sizeEnd: number;

        public color: util.Colour;
        public colourBegin: util.Colour;
        public colourEnd: util.Colour;

        public speedLimitBegin:number;
        public speedLimitEnd:number;

        public life: number = 0; // lifetime remaining in seconds
        public lifespan: number;

        // rendering properties
        //public shape: createjs.Shape; // canvas shape
        public shapeWidth: number;
        public shapeHeight: number;
        //public graphics: createjs.Graphics; // graphics class
        public colorFilters: createjs.Filter[]; // filters array
        public type: enums.ParticleShape;

        // CONSTRUCTOR
        constructor(type: enums.ParticleShape = enums.ParticleShape.CIRCLE, color:util.Colour =  util.Colour.Red(), size: number = 20)
        {
            super();

            this.color = color;
            this.type = type;
            this.size = size;


           // this._initialize();
        }

        // PRIVATE METHODS
        private _initialize():void
        {
            let filter = new createjs.ColorFilter(this.color.r / 255.0, this.color.g / 255.0, this.color.b / 255.0, this.color.a / 255.0);
            this.colorFilters = [filter];
            this.graphics.clear();
            this.graphics.setStrokeStyle(1);
            this.graphics.beginStroke(this.color.hex);
            this.graphics.beginFill(this.color.hex);
            switch(this.type)
            {
                case enums.ParticleShape.CIRCLE:
                    this.graphics.drawCircle(0, 0, this.size);
                    break;
                case enums.ParticleShape.SQUARE:
                    this.graphics.drawRect(0, 0, this.size, this.size);
                    break;
                case enums.ParticleShape.TRIANGLE:
                    this.graphics.drawPolyStar(0, 0, this.size, 3, 0, 90);
                    break;
                case enums.ParticleShape.HEXAGON:
                    this.graphics.drawPolyStar(0, 0, this.size, 6, 0, 90);
                    break;
                case enums.ParticleShape.STAR:
                    this.graphics.drawPolyStar(0, 0, this.size, 5, 0.5, 90);
                    break;
            }

            this.graphics.endFill();
            this.filters = this.colorFilters;
            this.regX = this.size * 0.5;
            this.regY = this.size * 0.5;
            this.snapToPixel = true;
            this.tickEnabled = false;
            //this.cache(-this.size, -this.size, this.size*2, this.size*2);
        }

        // PUBLIC METHODS
        public Update():void
        {
            // physics calculations
            this.force.x /= this.mass;
            this.force.y /= this.mass;
            this.acceleration.add(this.force);
            this.velocity.add(this.acceleration);
            //this.updateCache();
        }

    }
}
