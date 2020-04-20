module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _ocean?: objects.Ocean;
        private _plane?: objects.Plane;
        private _island?: objects.Island;

        private _clouds: Array<objects.Cloud>;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _keyboardManager: managers.Keyboard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._ocean = new objects.Ocean();
            this._plane = new objects.Plane();
            this._island = new objects.Island();
            
            // create the cloud array
            this._clouds = new Array<objects.Cloud>(); // empty container

            // instantiating CLOUD_NUM clouds
            for (let index = 0; index < config.Game.CLOUD_NUM; index++) 
            {
                this._clouds.push(new objects.Cloud());
            }
            
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;

            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;

            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;

             this.Main();
        }        
        
        public Update(): void 
        {
           this._ocean.Update();

           this._plane.Update();

          this._bulletManager.Update();

           this._island.Update();

           managers.Collision.AABBCheck(this._plane, this._island);

           this._clouds.forEach(cloud => {
               cloud.Update();
               managers.Collision.squaredRadiusCheck(this._plane, cloud);
           });
        }
        
        public Main(): void 
        {
            this.addChild(this._ocean);

            this.addChild(this._island);

            this.addChild(this._plane);

            this._bulletManager.AddBulletsToScene(this);

            for (const cloud of this._clouds) {
                this.addChild(cloud);
            }

            this.addChild(this._scoreBoard.LivesLabel);

            this.addChild(this._scoreBoard.ScoreLabel);
        }

        public Clean(): void
        {
            this._plane.engineSound.stop();
            this.removeAllChildren();
        }


    }

        
}