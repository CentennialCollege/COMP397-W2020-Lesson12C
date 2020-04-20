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
    var TextureButton = /** @class */ (function (_super) {
        __extends(TextureButton, _super);
        // constructor
        function TextureButton(button_name, x, y, isCentered) {
            if (button_name === void 0) { button_name = "button"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, button_name, x, y, isCentered) || this;
            _this.on("mouseover", _this.MouseOver);
            _this.on("mouseout", _this.MouseOut);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        TextureButton.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        TextureButton.prototype.MouseOver = function () {
            this.alpha = 0.7;
        };
        TextureButton.prototype.MouseOut = function () {
            this.alpha = 1.0;
        };
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        TextureButton.prototype.Start = function () {
            this.type = enums.GameObjectType.BUTTON;
        };
        TextureButton.prototype.Update = function () {
        };
        TextureButton.prototype.Reset = function () {
        };
        return TextureButton;
    }(objects.GameObject));
    ui.TextureButton = TextureButton;
})(ui || (ui = {}));
//# sourceMappingURL=TextureButton.js.map