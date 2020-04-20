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
    var Slider = /** @class */ (function (_super) {
        __extends(Slider, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of a Slider.
         * @param {number} [value=50]
         * @param {number} [min=1]
         * @param {number} [max=100]
         * @param {number} [width=100]
         * @param {number} [height=20]
         * @param {string} [orientation="horizontal"]
         * @param {string} [trackColor=config.Color.WHITE_SMOKE]
         * @param {string} [thumbColor=config.Color.DARK_GREY]
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {boolean} [isCentered=false]
         * @memberof Slider
         */
        function Slider(value, min, max, width, height, orientation, trackColor, thumbColor, x, y, isCentered) {
            if (value === void 0) { value = 50; }
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 100; }
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 20; }
            if (orientation === void 0) { orientation = enums.SliderOrientation.HORIZONTAL; }
            if (trackColor === void 0) { trackColor = config.Color.WHITE_SMOKE; }
            if (thumbColor === void 0) { thumbColor = config.Color.DARK_GREY; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this) || this;
            // initialize properties
            _this._graphics = new createjs.Graphics();
            _this._min = min;
            _this._max = max;
            _this._width = width;
            _this._height = height;
            _this.value = value;
            _this._trackColor = new objects.Color(trackColor);
            _this._thumbColor = new objects.Color(thumbColor);
            _this.cursor = "pointer";
            _this._orientation = orientation;
            _this.on("mousedown", _this._sliderChange, _this);
            _this.on("pressmove", _this._sliderChange, _this);
            _this._buildSlider();
            _this.x = x;
            _this.y = y;
            if (isCentered) {
                _this.regX = _this._width * 0.5;
                _this.regY = _this._height * 0.5;
            }
            return _this;
        }
        Object.defineProperty(Slider.prototype, "position", {
            // PUBLIC PROPERTIES ++++++++++++++++++++++++++
            /**
             * Returns current position vector
             *
             * @type {Vector2}
             * @memberof Slider
             */
            get: function () {
                return this._position;
            },
            /**
             * Sets current position vector
             *
             * @memberof Slider
             */
            set: function (newPosition) {
                this._position = newPosition;
                this.x = newPosition.x;
                this.y = newPosition.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Slider.prototype, "value", {
            /**
             * Returns current value of the Slider object
             *
             * @type {number}
             * @memberof Slider
             */
            get: function () {
                return this._value;
            },
            /**
             * Sets the current value of the Slider object
             *
             * @memberof Slider
             */
            set: function (newValue) {
                if (this._value != newValue) {
                    this._value = newValue;
                }
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        /**
         * this method calls the build method for either horizontal or vertical orientation cases
         *
         * @private
         * @memberof Slider
         */
        Slider.prototype._buildSlider = function () {
            var position;
            switch (this._orientation) {
                case enums.SliderOrientation.HORIZONTAL:
                    this._buildHorizontalSlider();
                    break;
                case enums.SliderOrientation.VERTICAL:
                    this._buildVerticalSlider();
                    break;
                default:
                    this._buildHorizontalSlider();
                    break;
            }
        };
        /**
         * This method builds a horizontal slider graphic
         *
         * @private
         * @memberof Slider
         */
        Slider.prototype._buildHorizontalSlider = function () {
            var position = (this._width - (this._height * 0.5)) * Math.max(0, Math.min(1, (this.value - this._min) / (this._max - this._min)));
            this._graphics.clear()
                .beginFill(this._trackColor.hex).drawRect(0, 0, this._width, this._height)
                .beginFill(this._thumbColor.hex).drawRect(position, 0, this._height * 0.5, this._height);
            this.graphics = this._graphics;
        };
        /**
         * This method builds a vertical slider graphic
         *
         * @private
         * @memberof Slider
         */
        Slider.prototype._buildVerticalSlider = function () {
            var position = (this._height - (this._width * 0.5)) * Math.max(0, Math.min(1, (this.value - this._min) / (this._max - this._min)));
            this._graphics.clear()
                .beginFill(this._trackColor.hex).drawRect(0, 0, this._width, this._height)
                .beginFill(this._thumbColor.hex).drawRect(0, this._height - (this._width * 0.5) - position, this._width, this._width * 0.5);
            this.graphics = this._graphics;
        };
        /**
         * This event handler changes the value of the slider object according to the mouse position
         *
         * @private
         * @param {createjs.MouseEvent} event
         * @returns
         * @memberof Slider
         */
        Slider.prototype._sliderChange = function (event) {
            var val;
            if (this._orientation == enums.SliderOrientation.VERTICAL) {
                val = ((this._height - this._width * 0.5) - event.localY) / (this._height - this._width) * (this._max - this._min) + this._min;
            }
            else {
                val = (event.localX - this._height * 0.5) / (this._width - this._height) * (this._max - this._min) + this._min;
            }
            val = Math.max(this._min, Math.min(this._max, val));
            if (val == this.value) {
                return;
            }
            this.value = val;
            this._buildSlider();
            this.dispatchEvent("change");
        };
        return Slider;
    }(createjs.Shape));
    objects.Slider = Slider;
})(objects || (objects = {}));
//# sourceMappingURL=slider.js.map