//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    //let stage:createjs.StageGL;

    let stats:Stats;

    let currentSceneState:scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let textureAtlas: createjs.SpriteSheet;
    let oceanAtlas: createjs.SpriteSheet;

    let assetManifest =
    [
        {id:"ocean", src:"./Assets/images/ocean.gif"},
        {id:"atlas", src:"./Assets/sprites/atlas.png"},
        {id:"engine", src:"./Assets/audio/engine.ogg"},
        {id:"yay", src:"./Assets/audio/yay.ogg"},
        {id:"thunder", src:"./Assets/audio/thunder.ogg"},
    ];

    let spriteData =
    {

        "images": {},
        "frames": [
            [1, 1, 16, 16, 0, 0, 0],
            [19, 1, 150, 50, 0, 0, 0],
            [1, 53, 226, 178, 0, 0, 0],
            [229, 53, 62, 63, 0, 0, 0],
            [1, 233, 65, 65, 0, 0, 0],
            [68, 233, 65, 65, 0, 0, 0],
            [135, 233, 65, 65, 0, 0, 0],
            [202, 233, 65, 65, 0, 0, 0],
            [1, 300, 150, 50, 0, 0, 0],
            [153, 300, 150, 50, 0, 0, 0]
        ],

        "animations": {
            "bullet": { "frames": [0] },
            "button": { "frames": [1] },
            "cloud": { "frames": [2] },
            "island": { "frames": [3] },
            "placeholder": { "frames": [4] },
            "plane": {
                "frames": [5, 6, 7],
                "speed": 0.5
                    },
            "restartButton": { "frames": [8] },
            "startButton": { "frames": [9] }
        }

        };

    let oceanData =
    {
        "images": {},
        "frames": [
            [0, 0, 640, 1440, 0, 0, 0],
        ],
        "animations": {
            "ocean": { "frames": [0] },
        }
    }


    function Preload():void
    {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        //stage = new createjs.StageGL(canvas);

        stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);

        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(30);

        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;

        oceanData.images = [assets.getResult("ocean")];
        oceanAtlas = new createjs.SpriteSheet(oceanData);
        config.Game.OCEAN_ATLAS = oceanAtlas;

        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update():void
    {
        stats.begin();
        if(currentSceneState != config.Game.SCENE)
        {
            Main();
        }

        currentScene.Update();

        stage.update();
        stats.end();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

        // clean up
        if(currentSceneState != scenes.State.NO_SCENE)
        {
            currentScene.Clean();
            stage.removeAllChildren();
        }

        // switch to the new scene
        config.Game.STAGE = stage;

        switch(config.Game.SCENE)
        {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);


    }

    window.addEventListener('load', Preload);


})();
