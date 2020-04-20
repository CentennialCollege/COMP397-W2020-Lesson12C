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
var ui;
(function (ui) {
    var CheckBox = /** @class */ (function (_super) {
        __extends(CheckBox, _super);
        // constructor
        function CheckBox(size, borderColour, fillColour, position, isCentered) {
            if (size === void 0) { size = 20; }
            if (borderColour === void 0) { borderColour = config.Colour.BLACK; }
            if (fillColour === void 0) { fillColour = config.Colour.DARK_GREY; }
            if (position === void 0) { position = new util.Vector2(0, 0); }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this) || this;
            _this.size = size;
            _this._borderColour = new util.Colour(borderColour);
            _this._fillColour = new util.Colour(fillColour);
            if (isCentered) {
                _this.regX = size * 0.5;
                _this.regY = size * 0.5;
            }
            _this._buildUncheckedBox();
            _this.position = new util.Vector2(position.x, position.y, _this);
            return _this;
        }
        Object.defineProperty(CheckBox.prototype, "checked", {
            get: function () {
                return this._checked;
            },
            set: function (v) {
                this._checked = v;
                if (v) {
                    this._buildCheckedBox();
                }
                else {
                    this._buildUncheckedBox();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CheckBox.prototype, "position", {
            // public properties
            get: function () {
                return this._position;
            },
            set: function (newPosition) {
                this._position = newPosition;
                this.x = newPosition.x;
                this.y = newPosition.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CheckBox.prototype, "size", {
            get: function () {
                return this._size;
            },
            set: function (v) {
                this._size = v;
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        CheckBox.prototype._buildUncheckedBox = function () {
            this.graphics.clear();
            this.graphics.setStrokeStyle(2);
            this.graphics.beginStroke(this._borderColour.hex);
            this.graphics.beginFill(config.Colour.WHITE_SMOKE);
            this.graphics.drawRect(0, 0, this.size, this.size);
            this.graphics.endFill();
            this.graphics.moveTo(2, 2);
            this.graphics.setStrokeStyle(2);
            this.graphics.beginStroke(config.Colour.WHITE);
            this.graphics.drawRect(2, 2, this.size - 4, this.size - 4);
            this.graphics.endStroke();
        };
        CheckBox.prototype._buildCheckedBox = function () {
            this.graphics.clear();
            this.graphics.setStrokeStyle(2);
            this.graphics.beginStroke(this._borderColour.hex);
            this.graphics.beginFill(this._fillColour.hex);
            this.graphics.drawRect(0, 0, this.size, this.size);
            this.graphics.endFill();
            this.graphics.moveTo(2, 2);
            this.graphics.setStrokeStyle(2);
            this.graphics.beginStroke(config.Colour.WHITE);
            this.graphics.drawRect(2, 2, this.size - 4, this.size - 4);
            this.graphics.endStroke();
        };
        // public methods
        CheckBox.prototype.Update = function () {
        };
        return CheckBox;
    }(createjs.Shape));
    ui.CheckBox = CheckBox;
})(ui || (ui = {}));
//# sourceMappingURL=CheckBox.js.map