module util
{
    export class Mathf
    {
        public static EPSILON: number = 0.000001;
        public static Deg2Rad: number = Math.PI / 180.0;
        public static Rad2Deg: number = 180.0 / Math.PI;

        /**
         * Returns the -1 if the value is less than 0 and 1 if the value is greater than 0
         *
         * @export
         * @param {number} value
         * @returns {number}
         */
        public static Sign(value: number): number {
            return (value < 0.0) ? -1.0 : 1.0;
        }

        public static Clamp(value:number, min:number, max:number)
        {
            if (value < min)
            {
                value = min;
            }
            else if (value > max)
            {
                value = max;
            }

        return value;
        }

        public static Clamp01(value:number):number
        {
            if (value < 0.0)
            {
                return 0.0;
            }

            if (value > 1.0)
            {
                return 1.0;
            }

        return value;
        }

        public static LimitMagnitude(vector: util.Vector2, magnitude: number): util.Vector2 {
            let length: number = util.Vector2.magnitude(vector);

            if (length > magnitude) {
                let limiter = magnitude / length;
                vector.x *= limiter;
                vector.y *= limiter;
                return vector;
            }
            else {
                return vector;
            }
        }



        public static Lerp(a:number, b:number, t:number):number
        {
            return a + (b - a) * Mathf.Clamp01(t);
        }

        public static LerpUnclamped(a:number, b:number, t:number):number
        {
            return a + (b - a) * t;
        }

        /**
         * Same as Lerp but makes sure the values interpolate correctly when they wrap around 360 degrees.
         *
         * @export
         * @param {number} a
         * @param {number} b
         * @param {number} t
         * @returns {number}
         */
        public static LerpAngle(a: number, b: number, t: number): number {
            let num: number = Mathf.Repeat(b - a, 360.0);
            if (num > 180.0) {
                num -= 360.0;
            }
            return a + num * Mathf.Clamp01(t);
        }

        /**
         * lerps between to color objects at some tValue;
         *
         * @export
         * @param {util.Colour} a
         * @param {util.Colour} b
         * @param {number} t
         * @returns {util.Colour}
         */
        public static LerpColor(a: util.Colour, b: util.Colour, t: number): util.Colour
        {
            let red = a.r + (b.r - a.r) * Mathf.Clamp01(t);
            let green = a.g + (b.g - a.g) * Mathf.Clamp01(t);
            let blue = a.b + (b.b - a.b) * Mathf.Clamp01(t);
            let alpha = a.a + (b.a - a.a) * Mathf.Clamp01(t);
            return new util.Colour(red, green, blue, alpha);
        }


        public static RandomRange(min:number, max:number):number
        {
            return Math.random() * (max  - min + 1) + min;
        }

        /**
         * Compares two floating point values and returns true if they are similar.
         *
         * @export
         * @param {number} a
         * @param {number} b
         * @returns {boolean}
         */
        public static Approximately(a: number, b: number): boolean {
            return Math.abs(b - a) < Math.max(1E-06 * Math.max(Math.abs(a), Math.abs(b)), Mathf.EPSILON * 8.0);
        }

        /**
         * Loops the value t, so that it is never larger than length and never smaller than 0.
         *
         * @export
         * @param {number} t
         * @param {number} length
         * @returns {number}
         */
        public static Repeat(t: number, length: number): number {
            return Mathf.Clamp(t - Math.floor(t / length) * length, 0.0, length);
        }



    }
}
