module ui
{
    export class CheckBox extends createjs.Shape
    {
        // private instance variables
        private _position:util.Vector2;
        private _size : number;
        private _borderColour : util.Colour;
        private _fillColour: util.Colour;
        private _checked : boolean;


        public get checked() : boolean
        {
            return this._checked;
        }

        public set checked(v : boolean)
        {
            this._checked = v;
            if(v)
            {
                this._buildCheckedBox();
            }
            else
            {
                this._buildUncheckedBox();
            }
        }



        // public properties
        get position():util.Vector2
        {
            return this._position;
        }

        set position(newPosition:util.Vector2)
        {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }

        public get size() : number
        {
            return this._size;
        }

        public set size(v : number)
        {
            this._size = v;
        }

        // constructor
        constructor(
            size:number = 20,
            borderColour:string = config.Colour.BLACK,
            fillColour:string = config.Colour.DARK_GREY,
            position:util.Vector2 = new util.Vector2(0, 0),
            isCentered:boolean = false)
        {
            super();

            this.size = size;
            this._borderColour = new util.Colour(borderColour);
            this._fillColour = new util.Colour(fillColour);

            if (isCentered) {
                this.regX = size * 0.5;
                this.regY = size * 0.5;
            }

            this._buildUncheckedBox();

            this.position = new util.Vector2(position.x, position.y, this);
        }

        // private methods
        private _buildUncheckedBox():void
        {
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
        }

        private _buildCheckedBox():void
        {
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
        }

        // public methods
        public Update():void
        {

        }

    }
}
