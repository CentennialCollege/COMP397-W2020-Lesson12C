module objects
{
    export class Button extends createjs.Container
    {
        // PRIVATE INSTANCE VARIABLES
        private _label : objects.Label;
        private _shape : createjs.Shape;

        private _position : objects.Vector2;
        private _width : number;
        private _height : number;

        private _defaultBackColour : objects.Color;
        private _borderColour : objects.Color;

        private _defaultLabelColor : string;
        private _mouseOverBackColour : objects.Color;
        private _mouseOverLabelColour : string;

        // PUBLIC PROPERTIES
        public get label() : objects.Label
        {
            return this._label;
        }

        public set label(v : objects.Label)
        {
            this._label = v;
        }

        public get shape() : createjs.Shape
        {
            return this._shape;
        }

        public set shape(v : createjs.Shape)
        {
            this._shape = v;
        }

        get position():Vector2
        {
            return this._position;
        }

        set position(newPosition:Vector2)
        {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }

        public get width() : number
        {
            return this._width;
        }

        public set width(v : number)
        {
            this._width = v;
        }

        public get height() : number
        {
            return this._height;
        }

        public set height(v : number)
        {
            this._height = v;
        }

        public get defaultBackColour() : objects.Color
        {
            return this._defaultBackColour;
        }

        public set defaultBackColour(v : objects.Color)
        {
            this._defaultBackColour = v;
        }

        public get mouseOverBackColour() : objects.Color
        {
            return this._mouseOverBackColour;
        }

        public set mouseOverBackColour(v : objects.Color)
        {
            this._mouseOverBackColour = v;
        }

        public get borderColour() : objects.Color
        {
            return this._borderColour;
        }

        public set borderColour(v : objects.Color)
        {
            this._borderColour = v;
        }


        public get defaultLabelColour() : string
        {
            return this._defaultLabelColor;
        }

        public set defaultLabelColour(v : string)
        {
            this._defaultLabelColor = v;
        }

        public get mouseOverLabelColour() : string
        {
            return this._mouseOverLabelColour;
        }

        public set mouseOverLabelColour(v : string)
        {
            this._mouseOverLabelColour = v;
        }

        // CONSTRUCTOR
        constructor(labelString:string = "Button",
                    defaultLabelColour:string = config.Color.BLACK,
                    mouseOverLabelColour: string = config.Color.WHITE,
                    width:number=0, height:number=0,
                    defaultBackColour: string = config.Color.WHITE_SMOKE,
                    mouseOverBackColour: string = config.Color.LIGHT_GREY,
                    borderColour: string = config.Color.DARK_GREY,
                    position:objects.Vector2 = new objects.Vector2(), isCentered: boolean = false)
        {
            super();

            this.defaultLabelColour = defaultLabelColour;
            this.mouseOverLabelColour = mouseOverLabelColour;

            let fontSize = (height * 0.5) + "px";
            this.label = new objects.Label(labelString, fontSize, "Consolas", this.defaultLabelColour, width * 0.5, height * 0.5, true);

            this.defaultBackColour = new objects.Color(defaultBackColour);
            this.mouseOverBackColour = new objects.Color(mouseOverBackColour);
            this.borderColour = new objects.Color(borderColour);

            this.shape = new createjs.Shape();

            this.width = width;
            this.height = height;

            if (isCentered) {
                this.regX = this.width * 0.5;
                this.regY = this.height * 0.5;
            }

            this.position = new objects.Vector2(position.x, position.y, this);

            this._buildDefaultButtonShape();

            this.setBounds(position.x, position.y, this.width, this.height);

            this.addChild(this.shape);
            this.addChild(this.label);

            this.on("mouseover", this._mouseOver);
            this.on("mouseout", this._mouseOut);
        }

        // PRIVATE METHODS
        private _buildDefaultButtonShape():void
        {
            this.shape.graphics.clear();
            this.shape.graphics.setStrokeStyle(1);
            this.shape.graphics.beginStroke(this.borderColour.hex);
            this.shape.graphics.beginFill(this.defaultBackColour.hex);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();

            this.label.fontColour = this.defaultLabelColour;
        }

        private _buildMouseOverButtonShape():void
        {
            this.shape.graphics.clear();
            this.shape.graphics.setStrokeStyle(1);
            this.shape.graphics.beginStroke(this.borderColour.hex);
            this.shape.graphics.beginFill(this.mouseOverBackColour.hex);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();

            this.label.fontColour = this.mouseOverLabelColour;
        }

        private _mouseOver():void
        {
            this._buildMouseOverButtonShape();
            //this.alpha = 0.5;
        }

        private _mouseOut():void
        {
            this._buildDefaultButtonShape();
            //this.alpha = 1.0;
        }

        // PUBLIC METHODS
        public Show(): void
        {
            this.shape.visible = true;
            this.label.visible = true;
        }

        public Hide(): void
        {
            this.shape.visible = false;
            this.label.visible = false;
        }
    }
}
