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
    var DropDown = /** @class */ (function (_super) {
        __extends(DropDown, _super);
        // CONSTRUCTOR
        function DropDown(list, defaultLabelColour, mouseOverLabelColour, width, height, defaultBackColour, mouseOverBackColour, borderColour, position, isCentered) {
            if (defaultLabelColour === void 0) { defaultLabelColour = config.Color.BLACK; }
            if (mouseOverLabelColour === void 0) { mouseOverLabelColour = config.Color.WHITE; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            if (defaultBackColour === void 0) { defaultBackColour = config.Color.WHITE_SMOKE; }
            if (mouseOverBackColour === void 0) { mouseOverBackColour = config.Color.LIGHT_GREY; }
            if (borderColour === void 0) { borderColour = config.Color.BLACK; }
            if (position === void 0) { position = new objects.Vector2(); }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this) || this;
            _this.itemList = list;
            _this.defaultLabelColour = defaultLabelColour;
            _this.mouseOverLabelColour = mouseOverLabelColour;
            _this.defaultBackColour = new objects.Color(defaultBackColour);
            _this.mouseOverBackColour = new objects.Color(mouseOverBackColour);
            _this.borderColour = new objects.Color(borderColour);
            _this.shape = new createjs.Shape();
            _this.width = width;
            _this.height = height;
            if (isCentered) {
                _this.regX = _this.width * 0.5;
                _this.regY = _this.height * 0.5;
            }
            _this.position = position;
            _this._showDefaultDropDownShape();
            _this.addChild(_this.shape);
            _this._buildListButtons();
            _this._collapseDropDown();
            _this.on("mouseover", _this._expandDropDown);
            _this.on("mouseout", _this._collapseDropDown);
            return _this;
        }
        Object.defineProperty(DropDown.prototype, "shape", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._shape;
            },
            set: function (v) {
                this._shape = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropDown.prototype, "itemList", {
            get: function () {
                return this._itemList;
            },
            set: function (v) {
                this._itemList = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropDown.prototype, "itemSelected", {
            get: function () {
                return this._itemSelected;
            },
            set: function (v) {
                this._itemSelected = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropDown.prototype, "position", {
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
        Object.defineProperty(DropDown.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (v) {
                this._width = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropDown.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (v) {
                this._height = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropDown.prototype, "defaultBackColour", {
            get: function () {
                return this._defualtBackColour;
            },
            set: function (v) {
                this._defualtBackColour = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropDown.prototype, "mouseOverBackColour", {
            get: function () {
                return this._mouseOverBackColour;
            },
            set: function (v) {
                this._mouseOverBackColour = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropDown.prototype, "defaultLabelColour", {
            get: function () {
                return this._defaultLabelColor;
            },
            set: function (v) {
                this._defaultLabelColor = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropDown.prototype, "mouseOverLabelColour", {
            get: function () {
                return this._mouseOverLabelColour;
            },
            set: function (v) {
                this._mouseOverLabelColour = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropDown.prototype, "borderColour", {
            get: function () {
                return this._borderColour;
            },
            set: function (v) {
                this._borderColour = v;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        DropDown.prototype._showDefaultDropDownShape = function () {
            this.shape.graphics.clear();
            this.shape.graphics.setStrokeStyle(1);
            this.shape.graphics.beginStroke(this.borderColour.hex);
            this.shape.graphics.beginFill(this.defaultBackColour.hex);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();
        };
        DropDown.prototype._showExpandedDropDownShape = function () {
            this.shape.graphics.clear();
            this.shape.graphics.setStrokeStyle(1);
            this.shape.graphics.beginStroke(this.borderColour.hex);
            this.shape.graphics.beginFill(this.defaultBackColour.hex);
            this.shape.graphics.drawRect(0, 0, this.width, this.height * this.itemList.length);
            this.shape.graphics.endFill();
        };
        DropDown.prototype._buildListButtons = function () {
            var _this = this;
            this.itemList.unshift(' ');
            this.itemSelected = 0;
            this._buttonList = new Array();
            var _loop_1 = function (itemIndex) {
                var itemPosition = new objects.Vector2(1, 1 + (this_1.height * itemIndex));
                var itemButton = new objects.Button(this_1.itemList[itemIndex], this_1.defaultLabelColour, this_1.mouseOverLabelColour, this_1.width - 2, this_1.height - 2, this_1.defaultBackColour.hex, this_1.mouseOverBackColour.hex, this_1.defaultBackColour.hex, itemPosition, false);
                itemButton.label.isCentered = false;
                itemButton.label.x = itemButton.width * 0.1;
                itemButton.label.y = itemButton.height * 0.25;
                itemButton.on("click", function () {
                    _this.itemSelected = itemIndex;
                    _this._collapseDropDown();
                    _this.dispatchEvent("change");
                });
                this_1.addChild(itemButton);
                this_1._buttonList.push(itemButton);
            };
            var this_1 = this;
            for (var itemIndex = 0; itemIndex < this.itemList.length; itemIndex++) {
                _loop_1(itemIndex);
            }
        };
        DropDown.prototype._collapseDropDown = function () {
            this._showDefaultDropDownShape();
            for (var buttonIndex = 0; buttonIndex < this._buttonList.length; buttonIndex++) {
                if (buttonIndex != this.itemSelected) {
                    this._buttonList[buttonIndex].Hide();
                }
            }
            this._buttonList[this.itemSelected].position.y = 1;
        };
        DropDown.prototype._expandDropDown = function () {
            //this.parent.removeChild(this);
            this.parent.addChild(this);
            this._showExpandedDropDownShape();
            for (var buttonIndex = 0; buttonIndex < this._buttonList.length; buttonIndex++) {
                this._buttonList[buttonIndex].position.y = 1 + (buttonIndex * this.height);
                this._buttonList[buttonIndex].Show();
            }
        };
        // PUBLIC METHODS
        DropDown.prototype.Update = function () {
        };
        return DropDown;
    }(createjs.Container));
    objects.DropDown = DropDown;
})(objects || (objects = {}));
//# sourceMappingURL=DropDown.js.map