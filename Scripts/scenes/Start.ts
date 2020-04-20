module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _emitter: objects.ParticleEmitter;

        // particle adjustment UI
        private _particleShapeLabel: ui.Label;
        private _particleShapeDropDown: ui.DropDown;

        private _particleNumberLabel: ui.Label;
        private _particleNumberSlider: ui.Slider;

        // emitter adjustment UI
        private _emissionShapeLabel: ui.Label;
        private _emissionShapeDropDown: ui.DropDown;

        private _emissionRateLabel: ui.Label;
        private _emissionRateSlider: ui.Slider;

        private _emissionWidthLabel: ui.Label;
        private _emissionWidthSlider: ui.Slider;

        private _emissionHeightLabel: ui.Label;
        private _emissionHeightSlider: ui.Slider;

        private _emissionCircleRadiusLabel: ui.Label;
        private _emissionCircleRadiusSlider: ui.Slider;

        private _emissionDirectionLabel: ui.Label;
        private _emissionDirectionSlider: ui.Slider;

        private _isPlayingLabel: ui.Label;
        private _isPlayingCheckBox: ui.CheckBox;


        // stored emitter values
        private _emitterParticleShape: enums.ParticleShape;
        private _emitterParticleNumber: number;
        private _emitterEmissionArc: number;
        private _emitterEmissionDirection: number;
        private _emitterEmissionShape: enums.EmissionShape;
        private _emitterEmissionRate: number;
        private _emitterEmissionSize: util.Vector2;
        private _emitterRadius: number;
        private _emitterIsPlaying: boolean;
        private _emitterDuration: number;
        private _emitterLoopDelay: number;
        private _emitterIsLooping: boolean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void
        {

            this._emitterSettings();

            this._emitter = new objects.ParticleEmitter();
            //instantiate a new Emitter Object

            this._initializeEmitter();

            this._emitter.position = new util.Vector2(320, 240);

            this.addChild(this._emitter);


            /* Editor UI Start here ------- */
            this._particleShapeLabel = new ui.Label("Particle Shape", "12px", "Consolas", config.Colour.BLACK, 10, 10, false);
            this.addChild(this._particleShapeLabel);
            let particleShapeItemList = ['Circle', 'Hexagon', 'Square', 'Star', 'Triangle'];
            this._particleShapeDropDown = new ui.DropDown(particleShapeItemList, config.Colour.BLACK, config.Colour.WHITE, 100,25,config.Colour.WHITE_SMOKE, config.Colour.DARK_GREY, config.Colour.BLACK, new util.Vector2(10, 30), false);
            this._particleShapeDropDown.on("change", ()=>{
                this._emitterParticleShape = this._particleShapeDropDown.itemSelected - 1;
                this._initializeEmitter();
            });
            this.addChild(this._particleShapeDropDown);

            this._particleNumberLabel = new ui.Label("Particle Number: " + this._emitterParticleNumber, "12px", "Consolas", config.Colour.BLACK, 10, 65, false);
            this.addChild(this._particleNumberLabel);
            this._particleNumberSlider = new ui.Slider(this._emitterParticleNumber, 0, 1000, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._particleNumberSlider.position = new util.Vector2(10, 85);
            this._particleNumberSlider.on("change", ()=>{
                this._emitterParticleNumber = Math.round(this._particleNumberSlider.value);
                this._particleNumberLabel.setText("Particle Number: " + this._emitterParticleNumber);
                this._initializeEmitter();
            });
            this.addChild(this._particleNumberSlider);

            this._emissionShapeLabel = new ui.Label("Emitter Shape", "12px", "Consolas", config.Colour.BLACK, 10, 125, false);
            this.addChild(this._emissionShapeLabel);
            let emissionShapeShapeItemList = ['Arc', 'Circle', 'Rectangle'];
            this._emissionShapeDropDown = new ui.DropDown(emissionShapeShapeItemList, config.Colour.BLACK, config.Colour.WHITE, 100,25,config.Colour.WHITE_SMOKE, config.Colour.DARK_GREY, config.Colour.BLACK, new util.Vector2(10, 145), false);
            this._emissionShapeDropDown.on("change", ()=>{
                this._emitterEmissionShape = this._emissionShapeDropDown.itemSelected - 1;
                this._initializeEmitter();
                if(this._emitterEmissionShape != enums.EmissionShape.RECTANGLE)
                {
                    this._emissionHeightLabel.visible = false;
                    this._emissionHeightSlider.visible = false;
                    this._emissionWidthLabel.visible = false;
                    this._emissionWidthSlider.visible = false;
                    this._emissionCircleRadiusLabel.visible = true;
                    this._emissionCircleRadiusSlider.visible = true;
                }
                else
                {
                    this._emissionHeightLabel.visible = true;
                    this._emissionHeightSlider.visible = true;
                    this._emissionWidthLabel.visible = true;
                    this._emissionWidthSlider.visible = true;
                    this._emissionCircleRadiusLabel.visible = false;
                    this._emissionCircleRadiusSlider.visible = false;
                }
            });
            this.addChild(this._emissionShapeDropDown);

            this._emissionRateLabel = new ui.Label("Emission Rate: " + this._emitterEmissionRate, "12px", "Consolas", config.Colour.BLACK, 10, 180, false);
            this.addChild(this._emissionRateLabel);
            this._emissionRateSlider = new ui.Slider(this._emitterEmissionRate, 0, 1000, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._emissionRateSlider.position = new util.Vector2(10, 200);
            this._emissionRateSlider.on("change", ()=>{
                this._emitterEmissionRate = Math.round(this._emissionRateSlider.value);
                this._emissionRateLabel.setText("Emission Rate: " + this._emitterEmissionRate);
                this._initializeEmitter();
            });
            this.addChild(this._emissionRateSlider);

            this._emissionDirectionLabel = new ui.Label("Emission Direction: " + this._emitterEmissionDirection, "12px", "Consolas", config.Colour.BLACK, 10, 225, false);
            this.addChild(this._emissionDirectionLabel);
            this._emissionDirectionSlider = new ui.Slider(this._emitterEmissionDirection, 0, 360, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._emissionDirectionSlider.position = new util.Vector2(10, 245);
            this._emissionDirectionSlider.on("change", ()=>{
                this._emitterEmissionDirection = Math.round(this._emissionDirectionSlider.value);
                this._emissionDirectionLabel.setText("Emission Direction: " + this._emitterEmissionDirection);
                this._initializeEmitter();
            });
            this.addChild(this._emissionDirectionSlider);

            this._emissionWidthLabel = new ui.Label("Emitter Width: " + this._emitterEmissionSize.x, "12px", "Consolas", config.Colour.BLACK, 10, 270, false);
            this.addChild(this._emissionWidthLabel);
            this._emissionWidthSlider = new ui.Slider(this._emitterEmissionSize.x, 0, config.Game.SCREEN_WIDTH, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._emissionWidthSlider.position = new util.Vector2(10, 290);
            this._emissionWidthSlider.on("change", ()=>{
                this._emitterEmissionSize.x = Math.round(this._emissionWidthSlider.value);
                this._emissionWidthLabel.setText("Emitter Width: " + this._emitterEmissionSize.x);
                this._initializeEmitter();
            });
            this.addChild(this._emissionWidthSlider);

            this._emissionHeightLabel = new ui.Label("Emitter Height: " + this._emitterEmissionSize.y, "12px", "Consolas", config.Colour.BLACK, 10, 315, false);
            this.addChild(this._emissionHeightLabel);
            this._emissionHeightSlider = new ui.Slider(this._emitterEmissionSize.y, 0, config.Game.SCREEN_HEIGHT, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._emissionHeightSlider.position = new util.Vector2(10, 335);
            this._emissionHeightSlider.on("change", ()=>{
                this._emitterEmissionSize.y = Math.round(this._emissionHeightSlider.value);
                this._emissionHeightLabel.setText("Emitter Height: " + this._emitterEmissionSize.y);
                this._initializeEmitter();
            });
            this.addChild(this._emissionHeightSlider);

            this._emissionCircleRadiusLabel = new ui.Label("Emitter Radius: " + this._emitterRadius, "12px", "Consolas", config.Colour.BLACK, 10, 270, false);
            this.addChild(this._emissionCircleRadiusLabel);
            this._emissionCircleRadiusSlider = new ui.Slider(this._emitterRadius, 0, config.Game.SCREEN_WIDTH, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._emissionCircleRadiusSlider.position = new util.Vector2(10, 290);
            this._emissionCircleRadiusSlider.on("change", ()=>{
                this._emitterRadius = Math.round(this._emissionCircleRadiusSlider.value);
                this._emissionCircleRadiusLabel.setText("Emitter Radius: " + this._emitterRadius);
                this._initializeEmitter();
            });
            this.addChild(this._emissionCircleRadiusSlider);

            this._emissionCircleRadiusLabel.visible = false;
            this._emissionCircleRadiusSlider.visible = false;

            this._isPlayingLabel = new ui.Label("Emitter Playing: ", "12px", "Consolas", config.Colour.BLACK, 10, 360, false);
            this.addChild(this._isPlayingLabel);
            this._isPlayingCheckBox = new ui.CheckBox(14, config.Colour.BLACK, config.Colour.DARK_GREY,
                new util.Vector2(10 + this._isPlayingLabel.getBounds().width + 5, 360), false);
            this._isPlayingCheckBox.checked = this._emitterIsPlaying;
            this._isPlayingCheckBox.on("click", ()=>{
                this._isPlayingCheckBox.checked = !this._isPlayingCheckBox.checked;
                this._emitterIsPlaying = !this._emitterIsPlaying;
                this._initializeEmitter();
            });
            this.addChild(this._isPlayingCheckBox);

            /* Editor UI End here ------- */

            this.Main();
        }

        private _emitterSettings() {
            this._emitterParticleShape = enums.ParticleShape.HEXAGON;
            this._emitterParticleNumber = 50;
            this._emitterEmissionArc = 30.0;
            this._emitterEmissionDirection = 90;
            this._emitterEmissionShape = enums.EmissionShape.RECTANGLE;
            this._emitterEmissionRate = 50;
            this._emitterEmissionSize = new util.Vector2(50, 200);
            this._emitterRadius = 100;
            this._emitterIsPlaying = true;
            this._emitterDuration = -1;
            this._emitterLoopDelay = 0;
            this._emitterIsLooping = true;
        }

        private _initializeEmitter()
        {
            this._emitter.particleShape = this._emitterParticleShape;

            // Emitter coonfiguration
            this._emitter.initialize(this._emitterParticleNumber);
            this._emitter.emissionArc = this._emitterEmissionArc;
            this._emitter.emissionDirection = this._emitterEmissionDirection;
            this._emitter.emissionShape = this._emitterEmissionShape;
            this._emitter.emissionRate = this._emitterEmissionRate;
            this._emitter.emissionSize = this._emitterEmissionSize;
            this._emitter.emissionRadius = this._emitterRadius;
            this._emitter.isPlaying = this._emitterIsPlaying;
            this._emitter.duration = this._emitterDuration;
            this._emitter.loopDelay = this._emitterLoopDelay;
            this._emitter.isLooping = this._emitterIsLooping;
        }



        public Update(): void
        {
            this._emitter.Update();
        }

        public Main(): void
        {


        }

        public Clean(): void{
            this.removeAllChildren();
        }


    }
}
