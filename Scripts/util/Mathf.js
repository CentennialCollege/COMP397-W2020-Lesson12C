"use strict";
var util;
(function (util) {
    var Mathf = /** @class */ (function () {
        function Mathf() {
        }
        /**
         * Returns the -1 if the value is less than 0 and 1 if the value is greater than 0
         *
         * @export
         * @param {number} value
         * @returns {number}
         */
        Mathf.Sign = function (value) {
            return (value < 0.0) ? -1.0 : 1.0;
        };
        Mathf.Clamp = function (value, min, max) {
            if (value < min) {
                value = min;
            }
            else if (value > max) {
                value = max;
            }
            return value;
        };
        Mathf.Clamp01 = function (value) {
            if (value < 0.0) {
                return 0.0;
            }
            if (value > 1.0) {
                return 1.0;
            }
            return value;
        };
        Mathf.LimitMagnitude = function (vector, magnitude) {
            var length = objects.Vector2.magnitude(vector);
            if (length > magnitude) {
                var limiter = magnitude / length;
                vector.x *= limiter;
                vector.y *= limiter;
                return vector;
            }
            else {
                return vector;
            }
        };
        Mathf.Lerp = function (a, b, t) {
            return a + (b - a) * Mathf.Clamp01(t);
        };
        Mathf.LerpUnclamped = function (a, b, t) {
            return a + (b - a) * t;
        };
        /**
         * Same as Lerp but makes sure the values interpolate correctly when they wrap around 360 degrees.
         *
         * @export
         * @param {number} a
         * @param {number} b
         * @param {number} t
         * @returns {number}
         */
        Mathf.LerpAngle = function (a, b, t) {
            var num = Mathf.Repeat(b - a, 360.0);
            if (num > 180.0) {
                num -= 360.0;
            }
            return a + num * Mathf.Clamp01(t);
        };
        /**
         * lerps between to color objects at some tValue;
         *
         * @export
         * @param {objects.Color} a
         * @param {objects.Color} b
         * @param {number} t
         * @returns {objects.Color}
         */
        Mathf.LerpColor = function (a, b, t) {
            var red = a.r + (b.r - a.r) * Mathf.Clamp01(t);
            var green = a.g + (b.g - a.g) * Mathf.Clamp01(t);
            var blue = a.b + (b.b - a.b) * Mathf.Clamp01(t);
            var alpha = a.a + (b.a - a.a) * Mathf.Clamp01(t);
            return new objects.Color(red, green, blue, alpha);
        };
        Mathf.RandomRange = function (min, max) {
            return Math.random() * (max - min + 1) + min;
        };
        /**
         * Compares two floating point values and returns true if they are similar.
         *
         * @export
         * @param {number} a
         * @param {number} b
         * @returns {boolean}
         */
        Mathf.Approximately = function (a, b) {
            return Math.abs(b - a) < Math.max(1E-06 * Math.max(Math.abs(a), Math.abs(b)), Mathf.EPSILON * 8.0);
        };
        /**
         * Loops the value t, so that it is never larger than length and never smaller than 0.
         *
         * @export
         * @param {number} t
         * @param {number} length
         * @returns {number}
         */
        Mathf.Repeat = function (t, length) {
            return Mathf.Clamp(t - Math.floor(t / length) * length, 0.0, length);
        };
        Mathf.EPSILON = 0.000001;
        Mathf.Deg2Rad = Math.PI / 180.0;
        Mathf.Rad2Deg = 180.0 / Math.PI;
        return Mathf;
    }());
    util.Mathf = Mathf;
})(util || (util = {}));
//# sourceMappingURL=Mathf.js.map