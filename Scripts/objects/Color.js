"use strict";
var objects;
(function (objects) {
    var Color = /** @class */ (function () {
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Color.
         *
         * @param {(number | number[] | string)} [r=0] red color value or number array or hex string
         * @param {number} [g=0] green color value
         * @param {number} [b=0] blue color value
         * @param {number} [a=0] alpha color value
         * @memberof Color
         */
        function Color(r, g, b, a) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            if (a === void 0) { a = 0; }
            // PUBLIC INSTANCE VARIABLES
            this._r = 0;
            this._g = 0;
            this._b = 0;
            this._a = 0;
            if (typeof r === "number") {
                this._setRGBA(r, g, b, a);
            }
            else if (typeof r === "string") {
                this._setHexColor(r);
            }
            else {
                this._arrayToColor(r);
            }
        }
        Object.defineProperty(Color.prototype, "r", {
            // PUBLIC PROPERTIES
            /**
             * This property returns the Red value of the Color object
             *
             * @type {number}
             * @memberof Color
             */
            get: function () {
                return this._r;
            },
            /**
            * This property sets the Red value of the Color object
            *
            * @type {number}
            * @memberof Color
            */
            set: function (red) {
                red = this._clampColor0To255(red);
                this._r = red;
                this._hex = this._toHexString();
                this._fullHex = this._toFullHexString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            /**
            * This property returns the Green value of the Color object
            *
            * @type {number}
            * @memberof Color
            */
            get: function () {
                return this._g;
            },
            /**
             * This property sets the Green value of the Color object
             *
             * @type {number}
             * @memberof Color
             */
            set: function (green) {
                green = this._clampColor0To255(green);
                this._g = green;
                this._hex = this._toHexString();
                this._fullHex = this._toFullHexString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "b", {
            /**
             * This property returns the Blue value of the Color object
             *
             * @type {number}
             * @memberof Color
             */
            get: function () {
                return this._b;
            },
            /**
            * This property sets the Blue value of the Color object
            *
            * @type {number}
            * @memberof Color
            */
            set: function (blue) {
                blue = this._clampColor0To255(blue);
                this._b = blue;
                this._hex = this._toHexString();
                this._fullHex = this._toFullHexString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "a", {
            /**
             * This property returns the Alpha value of the Color object
             *
             * @type {number}
             * @memberof Color
             */
            get: function () {
                return this._a;
            },
            /**
             * This property sets the Alpha value of the Color object
             *
             * @type {number}
             * @memberof Color
             */
            set: function (alpha) {
                alpha = this._clampColor0To255(alpha);
                this._a = alpha;
                this._fullHex = this._toFullHexString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "hex", {
            /**
             * This property returns a hex reprentation of the Color object
             * Does not include the alpha value
             *
             * @type {string}
             * @memberof Color
             */
            get: function () {
                return this._hex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "fullHex", {
            /**
             * This property returns a hex representation of the Color object
             *
             * @type {string}
             * @memberof Color
             */
            get: function () {
                return this._fullHex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "rgb", {
            /**
             * This property returns a number array composed of the r, g, and b components of the Color object.
             * Values range from 0 to 255.
             *
             * @type {number[]}
             * @memberof Color
             */
            get: function () {
                return [this.r, this.g, this.b];
            },
            /**
             * This property sets the r, g, b values of the color object.
             * Acceptable values are 0 to 255
             *
             * @type {number[]}
             * @memberof Color
             */
            set: function (color) {
                this._arrayToColor(color);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "normalize", {
            /**
             * This property returns a number array composed of the components of the Color object
             * Values range from 0 to 1
             *
             * @readonly
             * @type {number[]}
             * @memberof Color
             */
            get: function () {
                return [this.r / 255.00, this.g / 255.00, this.b / 255.00, this.a / 255.00];
            },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method returns a string representation of the color object
         *
         * @returns {string}
         * @memberof Color
         */
        Color.prototype.toString = function () {
            return "(R: " + this.r + " G: " + this.g + " B: " + this.b + " A: " + this.a + ")";
        };
        /**
         * Covert decimal value to hex value
         *
         * @param {number} [decimal=0]
         * @returns {string}
         * @memberof Color
         */
        Color.prototype.decimalToHex = function (decimal) {
            if (decimal === void 0) { decimal = 0; }
            var hex = Number(decimal).toString(16);
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            return hex;
        };
        // PUBLIC STATIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method returns a number array of normalized values (between 0 and 1)
         *
         * @static
         * @param {Color} color
         * @returns {number[]}
         * @memberof Color
         */
        Color.normalize = function (color) {
            return [color.r / 255.00, color.g / 255.00, color.b / 255.00, color.a / 255.00];
        };
        /**
         * This method the Hex Color representation of an R, G, B color object
         *
         * @static
         * @param {Color} color
         * @returns {string}
         * @memberof Color
         */
        Color.RGBToHex = function (color) {
            return "#" + color.decimalToHex(color.r) + color.decimalToHex(color.g) + color.decimalToHex(color.b);
        };
        /**
         * Converts a hex color string to a number array of r, g and b color components
         * Array values are between 0 and 255
         *
         * @static
         * @param {string} color
         * @returns {number[]}
         * @memberof Color
         */
        Color.HexToRGB = function (color) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        };
        Color.HexToColor = function (color) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            return new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 255);
        };
        Color.RandomRange = function (colorA, colorB) {
            var Red = Math.floor(util.Mathf.RandomRange(colorA.r, colorB.r));
            var Green = Math.floor(util.Mathf.RandomRange(colorA.g, colorB.g));
            var Blue = Math.floor(util.Mathf.RandomRange(colorA.b, colorB.b));
            var Alpha = Math.floor(util.Mathf.RandomRange(colorA.a, colorB.a));
            return new objects.Color(Red, Green, Blue, Alpha);
        };
        // PUBLIC COLOR PRESETS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        Color.Azure = function () {
            return new Color(config.Color.AZURE);
        };
        Color.Black = function () {
            return new Color(0, 0, 0, 255);
        };
        Color.Blue = function () {
            return new Color(0, 0, 255, 255);
        };
        Color.Brown = function () {
            return new Color(config.Color.BROWN);
        };
        Color.Crimson = function () {
            return new Color(config.Color.CRIMSON);
        };
        Color.Cyan = function () {
            return new Color(config.Color.CYAN);
        };
        Color.DarkBlue = function () {
            return new Color(config.Color.DARK_BLUE);
        };
        Color.DarkGrey = function () {
            return new Color(config.Color.DARK_GREY);
        };
        Color.DarkOrange = function () {
            return new Color(config.Color.DARK_ORANGE);
        };
        Color.DarkRed = function () {
            return new Color(config.Color.DARK_RED);
        };
        Color.Gold = function () {
            return new Color(config.Color.GOLD);
        };
        Color.Green = function () {
            return new Color(0, 255, 0, 255);
        };
        Color.Grey = function () {
            return new Color(config.Color.GREY);
        };
        Color.HotPink = function () {
            return new Color(config.Color.HOT_PINK);
        };
        Color.Indigo = function () {
            return new Color(config.Color.INDIGO);
        };
        Color.Ivory = function () {
            return new Color(config.Color.IVORY);
        };
        Color.LightBlue = function () {
            return new Color(config.Color.LIGHT_BLUE);
        };
        Color.LightGrey = function () {
            return new Color(config.Color.LIGHT_GREY);
        };
        Color.LightPink = function () {
            return new Color(config.Color.LIGHT_PINK);
        };
        Color.LightYellow = function () {
            return new Color(config.Color.LIGHT_YELLOW);
        };
        Color.Magenta = function () {
            return new Color(config.Color.MAGENTA);
        };
        Color.Maroon = function () {
            return new Color(config.Color.MAROON);
        };
        Color.Navy = function () {
            return new Color(config.Color.NAVY);
        };
        Color.Olive = function () {
            return new Color(config.Color.OLIVE);
        };
        Color.Orange = function () {
            return new Color(config.Color.ORANGE);
        };
        Color.Peach = function () {
            return new Color(config.Color.PEACH);
        };
        Color.Purple = function () {
            return new Color(config.Color.PURPLE);
        };
        Color.Red = function () {
            return new Color(255, 0, 0, 255);
        };
        Color.Silver = function () {
            return new Color(config.Color.SILVER);
        };
        Color.Teal = function () {
            return new Color(config.Color.TEAL);
        };
        Color.Violet = function () {
            return new Color(config.Color.VIOLET);
        };
        Color.White = function () {
            return new Color(255, 255, 255, 255);
        };
        Color.WhiteSmoke = function () {
            return new Color(config.Color.WHITE_SMOKE);
        };
        Color.Yellow = function () {
            return new Color(config.Color.YELLOW);
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Set the color component values
         *
         * @private
         * @param {number} [r]
         * @param {number} [g]
         * @param {number} [b]
         * @param {number} [a]
         * @memberof Color
         */
        Color.prototype._setRGBA = function (r, g, b, a) {
            if (r) {
                this.r = Math.floor(r);
            }
            if (g) {
                this.g = Math.floor(g);
            }
            if (b) {
                this.b = Math.floor(b);
            }
            if (a) {
                this.a = Math.floor(a);
            }
            if (!this.hex) {
                this._hex = this._toHexString();
            }
        };
        /**
         * Parses the hex color parameter to individual color components (r, g, b).
         * Sets alpha channel to 255.
         *
         * @private
         * @param {string} color
         * @memberof Color
         */
        Color.prototype._setHexColor = function (color) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            this.r = parseInt(result[1], 16);
            this.g = parseInt(result[2], 16);
            this.b = parseInt(result[3], 16);
            this.a = 255;
        };
        /**
         * Parses a number array and separates color components (r, g, b, a)
         *
         * @private
         * @param {number[]} color
         * @memberof Color
         */
        Color.prototype._arrayToColor = function (color) {
            var length = color.length;
            if (length > 0) {
                this.r = color[0];
                if (length > 1) {
                    this.g = color[1];
                    if (length > 2) {
                        this.b = color[2];
                        if (length > 3) {
                            this.a = color[3];
                        }
                    }
                }
            }
        };
        /**
         * This method clamps a number value beetween 0 and 255
         *
         * @private
         * @param {number} value
         * @returns {number}
         * @memberof Color
         */
        Color.prototype._clampColor0To255 = function (value) {
            var color = value;
            if (value < 0) {
                color = 0;
            }
            if (value > 255) {
                color = 255;
            }
            return color;
        };
        /**
         * This method converts a Color object's components to hex values and returns a hex string representation
         *
         * @private
         * @returns {string}
         * @memberof Color
         */
        Color.prototype._toFullHexString = function () {
            return "#" + this.decimalToHex(this.r) + this.decimalToHex(this.g) + this.decimalToHex(this.b) + this.decimalToHex(this.a);
        };
        /**
         * This method converts a Color object's components to hex values and returns a hex string representation
         * Does not include the alpha value
         *
         * @private
         * @returns {string}
         * @memberof Color
         */
        Color.prototype._toHexString = function () {
            return "#" + this.decimalToHex(this.r) + this.decimalToHex(this.g) + this.decimalToHex(this.b);
        };
        return Color;
    }());
    objects.Color = Color;
})(objects || (objects = {}));
//# sourceMappingURL=Color.js.map