module scenes
{
    export class End extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _gameOverLabel: objects.Label;
        private _restartButton: objects.TextureButton;
        private _ocean: objects.Ocean;

        private _scoreBoard: managers.ScoreBoard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Initializing and Instantiating
        public Start(): void
        {
             //instantiate a new Text object
            this._gameOverLabel = new objects.Label("Game Over", "80px", "Consolas", "#FFFF00", 320, 180, true);
            // buttons
             this._restartButton = new objects.TextureButton("restartButton", 320, 430, true);

             this._ocean = new objects.Ocean();

             this._scoreBoard  = new managers.ScoreBoard();
             this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
             this.Main();
        }

        public Update(): void
        {
            this._ocean.Update();
        }

        public Main(): void
        {
            this.addChild(this._ocean);

            this.addChild(this._gameOverLabel);


            this.addChild(this._restartButton);

            this._restartButton.on("click", ()=>{
                config.Game.LIVES = 5;
                config.Game.SCORE = 0;

                config.Game.SCENE = scenes.State.PLAY;
            });

            this.addChild(this._scoreBoard.highScoreLabel);

        }

        public Clean(): void{
            this.removeAllChildren();
        }


    }
}
