module objects
{
    export class CheckBox extends createjs.Shape
    {
        // private instance variables
        private _position:Vector2;
        private _size : number;
        private _borderColour : objects.Color;
        private _fillColour: objects.Color;
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
            borderColour:string = config.Color.BLACK,
            fillColour:string = config.Color.DARK_GREY,
            position:objects.Vector2 = new objects.Vector2(0, 0),
            isCentered:boolean = false)
        {
            super();

            this.size = size;
            this._borderColour = new objects.Color(borderColour);
            this._fillColour = new objects.Color(fillColour);

            if (isCentered) {
                this.regX = size * 0.5;
                this.regY = size * 0.5;
            }

            this._buildUncheckedBox();

            this.position = new objects.Vector2(position.x, position.y, this);
        }

        // private methods
        private _buildUncheckedBox():void
        {
            this.graphics.clear();
            this.graphics.setStrokeStyle(2);
            this.graphics.beginStroke(this._borderColour.hex);
            this.graphics.beginFill(config.Color.WHITE_SMOKE);
            this.graphics.drawRect(0, 0, this.size, this.size);
            this.graphics.endFill();

            this.graphics.moveTo(2, 2);
            this.graphics.setStrokeStyle(2);
            this.graphics.beginStroke(config.Color.WHITE);
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
            this.graphics.beginStroke(config.Color.WHITE);
            this.graphics.drawRect(2, 2, this.size - 4, this.size - 4);
            this.graphics.endStroke();
        }

        // public methods
        public Update():void
        {

        }

    }
}
