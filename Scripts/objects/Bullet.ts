module objects
{
    export class Bullet extends objects.GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "bullet", new Vector2(), true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // check upper bounds
            if(this.position.y <= -this.height)
            {
                this.Reset();
            }

            // check lower bounds
            if(this.position.y >= config.Game.SCREEN_HEIGHT + this.height)
            {
                this.Reset();
            }
        }

        private _move():void 
        {
            this.position = Vector2.add(this.position, this.velocity);
        }

        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.BULLET;
            this._verticalSpeed = 5; // 5 px per frame
            this.velocity = new Vector2(0, -this._verticalSpeed);
            this.Reset();
        }

        public Update(): void 
        {
            if(this.isActive)
            {
                this._move();
                this._checkBounds();
            }
        }

        public Reset(): void 
        {
           this.position = new objects.Vector2(-1000, -1000);
           this.isActive = false;
        }
    }
}