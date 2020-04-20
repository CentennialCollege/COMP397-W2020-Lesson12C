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
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // CONSTRUCTOR
        function Button(labelString, defaultLabelColour, mouseOverLabelColour, width, height, defaultBackColour, mouseOverBackColour, borderColour, position, isCentered) {
            if (labelString === void 0) { labelString = "Button"; }
            if (defaultLabelColour === void 0) { defaultLabelColour = config.Colour.BLACK; }
            if (mouseOverLabelColour === void 0) { mouseOverLabelColour = config.Colour.WHITE; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            if (defaultBackColour === void 0) { defaultBackColour = config.Colour.WHITE_SMOKE; }
            if (mouseOverBackColour === void 0) { mouseOverBackColour = config.Colour.LIGHT_GREY; }
            if (borderColour === void 0) { borderColour = config.Colour.DARK_GREY; }
            if (position === void 0) { position = new util.Vector2(); }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this) || this;
            _this.defaultLabelColour = defaultLabelColour;
            _this.mouseOverLabelColour = mouseOverLabelColour;
            var fontSize = (height * 0.5) + "px";
            _this.label = new ui.Label(labelString, fontSize, "Consolas", _this.defaultLabelColour, width * 0.5, height * 0.5, true);
            _this.defaultBackColour = new util.Colour(defaultBackColour);
            _this.mouseOverBackColour = new util.Colour(mouseOverBackColour);
            _this.borderColour = new util.Colour(borderColour);
            _this.shape = new createjs.Shape();
            _this.width = width;
            _this.height = height;
            if (isCentered) {
                _this.regX = _this.width * 0.5;
                _this.regY = _this.height * 0.5;
            }
            _this.position = new util.Vector2(position.x, position.y, _this);
            _this._buildDefaultButtonShape();
            _this.setBounds(position.x, position.y, _this.width, _this.height);
            _this.addChild(_this.shape);
            _this.addChild(_this.label);
            _this.on("mouseover", _this._mouseOver);
            _this.on("mouseout", _this._mouseOut);
            return _this;
        }
        Object.defineProperty(Button.prototype, "label", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._label;
            },
            set: function (v) {
                this._label = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "shape", {
            get: function () {
                return this._shape;
            },
            set: function (v) {
                this._shape = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "position", {
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
        Object.defineProperty(Button.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (v) {
                this._width = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (v) {
                this._height = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "defaultBackColour", {
            get: function () {
                return this._defaultBackColour;
            },
            set: function (v) {
                this._defaultBackColour = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "mouseOverBackColour", {
            get: function () {
                return this._mouseOverBackColour;
            },
            set: function (v) {
                this._mouseOverBackColour = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "borderColour", {
            get: function () {
                return this._borderColour;
            },
            set: function (v) {
                this._borderColour = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "defaultLabelColour", {
            get: function () {
                return this._defaultLabelColor;
            },
            set: function (v) {
                this._defaultLabelColor = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "mouseOverLabelColour", {
            get: function () {
                return this._mouseOverLabelColour;
            },
            set: function (v) {
                this._mouseOverLabelColour = v;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Button.prototype._buildDefaultButtonShape = function () {
            this.shape.graphics.clear();
            this.shape.graphics.setStrokeStyle(1);
            this.shape.graphics.beginStroke(this.borderColour.hex);
            this.shape.graphics.beginFill(this.defaultBackColour.hex);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();
            this.label.fontColour = this.defaultLabelColour;
        };
        Button.prototype._buildMouseOverButtonShape = function () {
            this.shape.graphics.clear();
            this.shape.graphics.setStrokeStyle(1);
            this.shape.graphics.beginStroke(this.borderColour.hex);
            this.shape.graphics.beginFill(this.mouseOverBackColour.hex);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();
            this.label.fontColour = this.mouseOverLabelColour;
        };
        Button.prototype._mouseOver = function () {
            this._buildMouseOverButtonShape();
            //this.alpha = 0.5;
        };
        Button.prototype._mouseOut = function () {
            this._buildDefaultButtonShape();
            //this.alpha = 1.0;
        };
        // PUBLIC METHODS
        Button.prototype.Show = function () {
            this.shape.visible = true;
            this.label.visible = true;
        };
        Button.prototype.Hide = function () {
            this.shape.visible = false;
            this.label.visible = false;
        };
        return Button;
    }(createjs.Container));
    ui.Button = Button;
})(ui || (ui = {}));
//# sourceMappingURL=Button.js.map