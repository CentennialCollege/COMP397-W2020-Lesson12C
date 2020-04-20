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
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            var _this = this;
            this._emitterSettings();
            this._emitter = new objects.ParticleEmitter();
            //instantiate a new Emitter Object
            this._initializeEmitter();
            this._emitter.position = new objects.Vector2(320, 240);
            this.addChild(this._emitter);
            /* Editor UI Start here ------- */
            this._particleShapeLabel = new objects.Label("Particle Shape", "12px", "Consolas", config.Color.BLACK, 10, 10, false);
            this.addChild(this._particleShapeLabel);
            var particleShapeItemList = ['Circle', 'Hexagon', 'Square', 'Star', 'Triangle'];
            this._particleShapeDropDown = new objects.DropDown(particleShapeItemList, config.Color.BLACK, config.Color.WHITE, 100, 25, config.Color.WHITE_SMOKE, config.Color.DARK_GREY, config.Color.BLACK, new objects.Vector2(10, 30), false);
            this._particleShapeDropDown.on("change", function () {
                _this._emitterParticleShape = _this._particleShapeDropDown.itemSelected - 1;
                _this._initializeEmitter();
            });
            this.addChild(this._particleShapeDropDown);
            this._particleNumberLabel = new objects.Label("Particle Number: " + this._emitterParticleNumber, "12px", "Consolas", config.Color.BLACK, 10, 65, false);
            this.addChild(this._particleNumberLabel);
            this._particleNumberSlider = new objects.Slider(this._emitterParticleNumber, 0, 1000, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._particleNumberSlider.position = new objects.Vector2(10, 85);
            this._particleNumberSlider.on("change", function () {
                _this._emitterParticleNumber = Math.round(_this._particleNumberSlider.value);
                _this._particleNumberLabel.setText("Particle Number: " + _this._emitterParticleNumber);
                _this._initializeEmitter();
            });
            this.addChild(this._particleNumberSlider);
            this._emissionShapeLabel = new objects.Label("Emitter Shape", "12px", "Consolas", config.Color.BLACK, 10, 125, false);
            this.addChild(this._emissionShapeLabel);
            var emissionShapeShapeItemList = ['Arc', 'Circle', 'Rectangle'];
            this._emissionShapeDropDown = new objects.DropDown(emissionShapeShapeItemList, config.Color.BLACK, config.Color.WHITE, 100, 25, config.Color.WHITE_SMOKE, config.Color.DARK_GREY, config.Color.BLACK, new objects.Vector2(10, 145), false);
            this._emissionShapeDropDown.on("change", function () {
                _this._emitterEmissionShape = _this._emissionShapeDropDown.itemSelected - 1;
                _this._initializeEmitter();
                if (_this._emitterEmissionShape != enums.EmissionShape.RECTANGLE) {
                    _this._emissionHeightLabel.visible = false;
                    _this._emissionHeightSlider.visible = false;
                    _this._emissionWidthLabel.visible = false;
                    _this._emissionWidthSlider.visible = false;
                    _this._emissionCircleRadiusLabel.visible = true;
                    _this._emissionCircleRadiusSlider.visible = true;
                }
                else {
                    _this._emissionHeightLabel.visible = true;
                    _this._emissionHeightSlider.visible = true;
                    _this._emissionWidthLabel.visible = true;
                    _this._emissionWidthSlider.visible = true;
                    _this._emissionCircleRadiusLabel.visible = false;
                    _this._emissionCircleRadiusSlider.visible = false;
                }
            });
            this.addChild(this._emissionShapeDropDown);
            this._emissionRateLabel = new objects.Label("Emission Rate: " + this._emitterEmissionRate, "12px", "Consolas", config.Color.BLACK, 10, 180, false);
            this.addChild(this._emissionRateLabel);
            this._emissionRateSlider = new objects.Slider(this._emitterEmissionRate, 0, 1000, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._emissionRateSlider.position = new objects.Vector2(10, 200);
            this._emissionRateSlider.on("change", function () {
                _this._emitterEmissionRate = Math.round(_this._emissionRateSlider.value);
                _this._emissionRateLabel.setText("Emission Rate: " + _this._emitterEmissionRate);
                _this._initializeEmitter();
            });
            this.addChild(this._emissionRateSlider);
            this._emissionDirectionLabel = new objects.Label("Emission Direction: " + this._emitterEmissionDirection, "12px", "Consolas", config.Color.BLACK, 10, 225, false);
            this.addChild(this._emissionDirectionLabel);
            this._emissionDirectionSlider = new objects.Slider(this._emitterEmissionDirection, 0, 360, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._emissionDirectionSlider.position = new objects.Vector2(10, 245);
            this._emissionDirectionSlider.on("change", function () {
                _this._emitterEmissionDirection = Math.round(_this._emissionDirectionSlider.value);
                _this._emissionDirectionLabel.setText("Emission Direction: " + _this._emitterEmissionDirection);
                _this._initializeEmitter();
            });
            this.addChild(this._emissionDirectionSlider);
            this._emissionWidthLabel = new objects.Label("Emitter Width: " + this._emitterEmissionSize.x, "12px", "Consolas", config.Color.BLACK, 10, 270, false);
            this.addChild(this._emissionWidthLabel);
            this._emissionWidthSlider = new objects.Slider(this._emitterEmissionSize.x, 0, config.Game.SCREEN_WIDTH, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._emissionWidthSlider.position = new objects.Vector2(10, 290);
            this._emissionWidthSlider.on("change", function () {
                _this._emitterEmissionSize.x = Math.round(_this._emissionWidthSlider.value);
                _this._emissionWidthLabel.setText("Emitter Width: " + _this._emitterEmissionSize.x);
                _this._initializeEmitter();
            });
            this.addChild(this._emissionWidthSlider);
            this._emissionHeightLabel = new objects.Label("Emitter Height: " + this._emitterEmissionSize.y, "12px", "Consolas", config.Color.BLACK, 10, 315, false);
            this.addChild(this._emissionHeightLabel);
            this._emissionHeightSlider = new objects.Slider(this._emitterEmissionSize.y, 0, config.Game.SCREEN_HEIGHT, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._emissionHeightSlider.position = new objects.Vector2(10, 335);
            this._emissionHeightSlider.on("change", function () {
                _this._emitterEmissionSize.y = Math.round(_this._emissionHeightSlider.value);
                _this._emissionHeightLabel.setText("Emitter Height: " + _this._emitterEmissionSize.y);
                _this._initializeEmitter();
            });
            this.addChild(this._emissionHeightSlider);
            this._emissionCircleRadiusLabel = new objects.Label("Emitter Radius: " + this._emitterRadius, "12px", "Consolas", config.Color.BLACK, 10, 270, false);
            this.addChild(this._emissionCircleRadiusLabel);
            this._emissionCircleRadiusSlider = new objects.Slider(this._emitterRadius, 0, config.Game.SCREEN_WIDTH, 100, 15, enums.SliderOrientation.HORIZONTAL);
            this._emissionCircleRadiusSlider.position = new objects.Vector2(10, 290);
            this._emissionCircleRadiusSlider.on("change", function () {
                _this._emitterRadius = Math.round(_this._emissionCircleRadiusSlider.value);
                _this._emissionCircleRadiusLabel.setText("Emitter Radius: " + _this._emitterRadius);
                _this._initializeEmitter();
            });
            this.addChild(this._emissionCircleRadiusSlider);
            this._emissionCircleRadiusLabel.visible = false;
            this._emissionCircleRadiusSlider.visible = false;
            this._isPlayingLabel = new objects.Label("Emitter Playing: ", "12px", "Consolas", config.Color.BLACK, 10, 360, false);
            this.addChild(this._isPlayingLabel);
            this._isPlayingCheckBox = new objects.CheckBox(14, config.Color.BLACK, config.Color.DARK_GREY, new objects.Vector2(10 + this._isPlayingLabel.getBounds().width + 5, 360), false);
            this._isPlayingCheckBox.checked = this._emitterIsPlaying;
            this._isPlayingCheckBox.on("click", function () {
                _this._isPlayingCheckBox.checked = !_this._isPlayingCheckBox.checked;
                _this._emitterIsPlaying = !_this._emitterIsPlaying;
                _this._initializeEmitter();
            });
            this.addChild(this._isPlayingCheckBox);
            /* Editor UI End here ------- */
            this.Main();
        };
        Start.prototype._emitterSettings = function () {
            this._emitterParticleShape = enums.ParticleShape.HEXAGON;
            this._emitterParticleNumber = 50;
            this._emitterEmissionArc = 30.0;
            this._emitterEmissionDirection = 90;
            this._emitterEmissionShape = enums.EmissionShape.RECTANGLE;
            this._emitterEmissionRate = 50;
            this._emitterEmissionSize = new objects.Vector2(50, 200);
            this._emitterRadius = 100;
            this._emitterIsPlaying = true;
            this._emitterDuration = -1;
            this._emitterLoopDelay = 0;
            this._emitterIsLooping = true;
        };
        Start.prototype._initializeEmitter = function () {
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
        };
        Start.prototype.Update = function () {
            this._emitter.Update();
        };
        Start.prototype.Main = function () {
        };
        Start.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map