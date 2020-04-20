module objects
{
    export class Label extends createjs.Text
    {
        // PRIVATE INSTANCE VAIRABLES
        private _fontColour : string;
        private _isCentered: boolean

        // PUBLIC PROPERTIES

        public get fontColour() : string
        {
            return this._fontColour;
        }

        public set fontColour(v : string)
        {
            this._fontColour = v;
            this.color = this._fontColour;
        }

        public get isCentered() : boolean
        {
            return this._isCentered;
        }

        public set isCentered(v : boolean)
        {
            this._isCentered = v;

            if(v)
            {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
            else
            {
                this.regX = 0;
                this.regY = 0;
            }
        }



        // constructor
        constructor(
            public labelString:string = "empty label",
            public fontSize: string = "12px",
            public fontFamily: string = "Consolas",
            fontColour: string = config.Color.BLACK,
            x: number = 0, y: number = 0, isCentered:boolean = false)
            {
                super(labelString, fontSize + " " + fontFamily, fontColour);

                this.fontColour = fontColour;
                this.isCentered = isCentered;

                this.x = x;
                this.y = y;
            }

        // methods

        public setText(newText:string)
        {
            this.text = newText;

            if(this.isCentered)
            {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
        }
    }
}
