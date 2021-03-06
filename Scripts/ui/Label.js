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
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        // constructor
        function Label(labelString, fontSize, fontFamily, fontColour, x, y, isCentered) {
            if (labelString === void 0) { labelString = "empty label"; }
            if (fontSize === void 0) { fontSize = "12px"; }
            if (fontFamily === void 0) { fontFamily = "Consolas"; }
            if (fontColour === void 0) { fontColour = config.Colour.BLACK; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, labelString, fontSize + " " + fontFamily, fontColour) || this;
            _this.labelString = labelString;
            _this.fontSize = fontSize;
            _this.fontFamily = fontFamily;
            _this.fontColour = fontColour;
            _this.isCentered = isCentered;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        Object.defineProperty(Label.prototype, "fontColour", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._fontColour;
            },
            set: function (v) {
                this._fontColour = v;
                this.color = this._fontColour;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "isCentered", {
            get: function () {
                return this._isCentered;
            },
            set: function (v) {
                this._isCentered = v;
                if (v) {
                    this.regX = this.getBounds().width * 0.5;
                    this.regY = this.getMeasuredLineHeight() * 0.5;
                }
                else {
                    this.regX = 0;
                    this.regY = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        // methods
        Label.prototype.setText = function (newText) {
            this.text = newText;
            if (this.isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
        };
        return Label;
    }(createjs.Text));
    ui.Label = Label;
})(ui || (ui = {}));
//# sourceMappingURL=Label.js.map