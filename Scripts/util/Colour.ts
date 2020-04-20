module util
{
    export class Colour {
        // PUBLIC INSTANCE VARIABLES
        private _r: number = 0;
        private _g: number = 0;
        private _b: number = 0;
        private _a: number = 0;
        private _hex: string;
        private _fullHex: string;

        // PUBLIC PROPERTIES
        /**
         * This property returns the Red value of the Color object
         *
         * @type {number}
         * @memberof Color
         */
        get r(): number {
            return this._r;
        }

        /**
        * This property sets the Red value of the Color object
        *
        * @type {number}
        * @memberof Color
        */
        set r(red: number) {
            red = this._clampColor0To255(red);
            this._r = red;
            this._hex = this._toHexString();
            this._fullHex = this._toFullHexString();
        }

        /**
        * This property returns the Green value of the Color object
        *
        * @type {number}
        * @memberof Color
        */
        get g(): number {
            return this._g;
        }

        /**
         * This property sets the Green value of the Color object
         *
         * @type {number}
         * @memberof Color
         */
        set g(green: number) {
            green = this._clampColor0To255(green);
            this._g = green;
            this._hex = this._toHexString();
            this._fullHex = this._toFullHexString();
        }

        /**
         * This property returns the Blue value of the Color object
         *
         * @type {number}
         * @memberof Color
         */
        get b(): number {
            return this._b;
        }

        /**
        * This property sets the Blue value of the Color object
        *
        * @type {number}
        * @memberof Color
        */
        set b(blue: number) {
            blue = this._clampColor0To255(blue);
            this._b = blue;
            this._hex = this._toHexString();
            this._fullHex = this._toFullHexString();
        }

        /**
         * This property returns the Alpha value of the Color object
         *
         * @type {number}
         * @memberof Color
         */
        get a(): number {
            return this._a;
        }

        /**
         * This property sets the Alpha value of the Color object
         *
         * @type {number}
         * @memberof Color
         */
        set a(alpha: number) {
            alpha = this._clampColor0To255(alpha);
            this._a = alpha;
            this._fullHex = this._toFullHexString();
        }

        /**
         * This property returns a hex reprentation of the Color object
         * Does not include the alpha value
         *
         * @type {string}
         * @memberof Color
         */
        get hex(): string {
            return this._hex;
        }

        /**
         * This property returns a hex representation of the Color object
         *
         * @type {string}
         * @memberof Color
         */
        get fullHex(): string {
            return this._fullHex;
        }

        /**
         * This property returns a number array composed of the r, g, and b components of the Color object.
         * Values range from 0 to 255.
         *
         * @type {number[]}
         * @memberof Color
         */
        get rgb(): number[] {
            return [this.r, this.g, this.b];
        }

        /**
         * This property sets the r, g, b values of the color object.
         * Acceptable values are 0 to 255
         *
         * @type {number[]}
         * @memberof Color
         */
        set rgb(color: number[]) {
            this._arrayToColor(color);
        }

        /**
         * This property returns a number array composed of the components of the Color object
         * Values range from 0 to 1
         *
         * @readonly
         * @type {number[]}
         * @memberof Color
         */
        get normalize(): number[] {
            return [this.r / 255.00, this.g / 255.00, this.b / 255.00, this.a / 255.00];
        }

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
        constructor(r: number | number[] | string = 0, g: number = 0, b: number = 0, a: number = 0) {
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

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method returns a string representation of the color object
         *
         * @returns {string}
         * @memberof Color
         */
        public toString(): string {
            return "(R: " + this.r + " G: " + this.g + " B: " + this.b + " A: " + this.a + ")";
        }

        /**
         * Covert decimal value to hex value
         *
         * @param {number} [decimal=0]
         * @returns {string}
         * @memberof Color
         */
        public decimalToHex(decimal: number = 0): string {
            let hex = Number(decimal).toString(16);
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            return hex;
        }


        // PUBLIC STATIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        /**
         * This method returns a number array of normalized values (between 0 and 1)
         *
         * @static
         * @param {Colour} color
         * @returns {number[]}
         * @memberof Color
         */
        public static normalize(color: Colour): number[] {
            return [color.r / 255.00, color.g / 255.00, color.b / 255.00, color.a / 255.00]
        }

        /**
         * This method the Hex Color representation of an R, G, B color object
         *
         * @static
         * @param {Colour} color
         * @returns {string}
         * @memberof Color
         */
        public static RGBToHex(color: Colour): string {
            return "#" + color.decimalToHex(color.r) + color.decimalToHex(color.g) + color.decimalToHex(color.b);
        }

        /**
         * Converts a hex color string to a number array of r, g and b color components
         * Array values are between 0 and 255
         *
         * @static
         * @param {string} color
         * @returns {number[]}
         * @memberof Color
         */
        public static HexToRGB(color: string): number[] {
            let result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        }

        public static HexToColor(color: string): Colour {
            let result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            return new Colour(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 255);
        }

        public static RandomRange(colorA: util.Colour, colorB: util.Colour): util.Colour {
            let Red: number = Math.floor(util.Mathf.RandomRange(colorA.r, colorB.r));
            let Green: number = Math.floor(util.Mathf.RandomRange(colorA.g, colorB.g));
            let Blue: number = Math.floor(util.Mathf.RandomRange(colorA.b, colorB.b));
            let Alpha: number = Math.floor(util.Mathf.RandomRange(colorA.a, colorB.a));
            return new util.Colour(Red, Green, Blue, Alpha);
        }

        // PUBLIC COLOR PRESETS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        public static Azure(): Colour {
            return new Colour(config.Colour.AZURE);
        }

        public static Black(): Colour {
            return new Colour(0, 0, 0, 255);
        }

        public static Blue(): Colour {
            return new Colour(0, 0, 255, 255);
        }

        public static Brown(): Colour {
            return new Colour(config.Colour.BROWN);
        }

        public static Crimson(): Colour {
            return new Colour(config.Colour.CRIMSON);
        }

        public static Cyan(): Colour {
            return new Colour(config.Colour.CYAN);
        }

        public static DarkBlue(): Colour {
            return new Colour(config.Colour.DARK_BLUE);
        }

        public static DarkGrey(): Colour {
            return new Colour(config.Colour.DARK_GREY);
        }

        public static DarkOrange(): Colour {
            return new Colour(config.Colour.DARK_ORANGE);
        }

        public static DarkRed(): Colour {
            return new Colour(config.Colour.DARK_RED);
        }

        public static Gold(): Colour {
            return new Colour(config.Colour.GOLD);
        }

        public static Green(): Colour {
            return new Colour(0, 255, 0, 255);
        }

        public static Grey(): Colour {
            return new Colour(config.Colour.GREY);
        }

        public static HotPink(): Colour {
            return new Colour(config.Colour.HOT_PINK);
        }

        public static Indigo(): Colour {
            return new Colour(config.Colour.INDIGO);
        }

        public static Ivory(): Colour {
            return new Colour(config.Colour.IVORY);
        }

        public static LightBlue(): Colour {
            return new Colour(config.Colour.LIGHT_BLUE);
        }

        public static LightGrey(): Colour {
            return new Colour(config.Colour.LIGHT_GREY);
        }

        public static LightPink(): Colour {
            return new Colour(config.Colour.LIGHT_PINK);
        }

        public static LightYellow(): Colour {
            return new Colour(config.Colour.LIGHT_YELLOW);
        }

        public static Magenta(): Colour {
            return new Colour(config.Colour.MAGENTA);
        }

        public static Maroon(): Colour {
            return new Colour(config.Colour.MAROON);
        }

        public static Navy(): Colour {
            return new Colour(config.Colour.NAVY);
        }

        public static Olive(): Colour {
            return new Colour(config.Colour.OLIVE);
        }

        public static Orange(): Colour {
            return new Colour(config.Colour.ORANGE);
        }

        public static Peach(): Colour {
            return new Colour(config.Colour.PEACH);
        }

        public static Purple(): Colour {
            return new Colour(config.Colour.PURPLE);
        }

        public static Red(): Colour {
            return new Colour(255, 0, 0, 255);
        }

        public static Silver(): Colour {
            return new Colour(config.Colour.SILVER);
        }

        public static Teal(): Colour {
            return new Colour(config.Colour.TEAL);
        }

        public static Violet(): Colour {
            return new Colour(config.Colour.VIOLET);
        }

        public static White(): Colour {
            return new Colour(255, 255, 255, 255);
        }

        public static WhiteSmoke(): Colour {
            return new Colour(config.Colour.WHITE_SMOKE);
        }

        public static Yellow(): Colour {
            return new Colour(config.Colour.YELLOW);
        }

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
        private _setRGBA(r?: number, g?: number, b?: number, a?: number): void {
            if (r) { this.r = Math.floor(r); }
            if (g) { this.g = Math.floor(g); }
            if (b) { this.b = Math.floor(b); }
            if (a) { this.a = Math.floor(a); }
            if(!this.hex) {
                this._hex = this._toHexString();
            }
        }

        /**
         * Parses the hex color parameter to individual color components (r, g, b).
         * Sets alpha channel to 255.
         *
         * @private
         * @param {string} color
         * @memberof Color
         */
        private _setHexColor(color: string): void {
            let result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            this.r = parseInt(result[1], 16);
            this.g = parseInt(result[2], 16);
            this.b = parseInt(result[3], 16);
            this.a = 255;
        }

        /**
         * Parses a number array and separates color components (r, g, b, a)
         *
         * @private
         * @param {number[]} color
         * @memberof Color
         */
        private _arrayToColor(color: number[]): void {
            let length = color.length;
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
        }

        /**
         * This method clamps a number value beetween 0 and 255
         *
         * @private
         * @param {number} value
         * @returns {number}
         * @memberof Color
         */
        private _clampColor0To255(value: number): number {
            let color: number = value;
            if (value < 0) {
                color = 0;
            }
            if (value > 255) {
                color = 255;
            }
            return color;
        }

        /**
         * This method converts a Color object's components to hex values and returns a hex string representation
         *
         * @private
         * @returns {string}
         * @memberof Color
         */
        private _toFullHexString(): string {
            return "#" + this.decimalToHex(this.r) + this.decimalToHex(this.g) + this.decimalToHex(this.b) + this.decimalToHex(this.a);
        }

        /**
         * This method converts a Color object's components to hex values and returns a hex string representation
         * Does not include the alpha value
         *
         * @private
         * @returns {string}
         * @memberof Color
         */
        private _toHexString(): string {
            return "#" + this.decimalToHex(this.r) + this.decimalToHex(this.g) + this.decimalToHex(this.b);
        }
    }
}
