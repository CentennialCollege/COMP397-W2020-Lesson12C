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
    var Particle = /** @class */ (function (_super) {
        __extends(Particle, _super);
        // CONSTRUCTOR
        function Particle(type, color, size) {
            if (type === void 0) { type = enums.ParticleShape.CIRCLE; }
            if (color === void 0) { color = util.Colour.Red(); }
            if (size === void 0) { size = 20; }
            var _this = _super.call(this) || this;
            // Physical Properties
            _this.velocity = new util.Vector2();
            _this.acceleration = new util.Vector2();
            _this.force = new util.Vector2();
            _this.mass = 1.0;
            _this.life = 0; // lifetime remaining in seconds
            _this.color = color;
            _this.type = type;
            _this.size = size;
            return _this;
            // this._initialize();
        }
        Object.defineProperty(Particle.prototype, "size", {
            // PUBLIC INSTANCE VARIABLES
            get: function () {
                return this._size;
            },
            set: function (v) {
                this._size = v;
                this._initialize();
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Particle.prototype._initialize = function () {
            var filter = new createjs.ColorFilter(this.color.r / 255.0, this.color.g / 255.0, this.color.b / 255.0, this.color.a / 255.0);
            this.colorFilters = [filter];
            this.graphics.clear();
            this.graphics.setStrokeStyle(1);
            this.graphics.beginStroke(this.color.hex);
            this.graphics.beginFill(this.color.hex);
            switch (this.type) {
                case enums.ParticleShape.CIRCLE:
                    this.graphics.drawCircle(0, 0, this.size);
                    break;
                case enums.ParticleShape.SQUARE:
                    this.graphics.drawRect(0, 0, this.size, this.size);
                    break;
                case enums.ParticleShape.TRIANGLE:
                    this.graphics.drawPolyStar(0, 0, this.size, 3, 0, 90);
                    break;
                case enums.ParticleShape.HEXAGON:
                    this.graphics.drawPolyStar(0, 0, this.size, 6, 0, 90);
                    break;
                case enums.ParticleShape.STAR:
                    this.graphics.drawPolyStar(0, 0, this.size, 5, 0.5, 90);
                    break;
            }
            this.graphics.endFill();
            this.filters = this.colorFilters;
            this.regX = this.size * 0.5;
            this.regY = this.size * 0.5;
            this.snapToPixel = true;
            this.tickEnabled = false;
            //this.cache(-this.size, -this.size, this.size*2, this.size*2);
        };
        // PUBLIC METHODS
        Particle.prototype.Update = function () {
            // physics calculations
            this.force.x /= this.mass;
            this.force.y /= this.mass;
            this.acceleration.add(this.force);
            this.velocity.add(this.acceleration);
            //this.updateCache();
        };
        return Particle;
    }(createjs.Shape));
    objects.Particle = Particle;
})(objects || (objects = {}));
//# sourceMappingURL=Particle.js.map