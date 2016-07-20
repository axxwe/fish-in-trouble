class Component {

    public score: number = 0;
    public speedX: number = 0;
    public speedY: number = 0;
    public gravity: number = 0;
    public gravitySpeed: number = 0;
    public text: string = null;

    constructor(
        public width: number, 
        public height: number, 
        private color: string, 
        public x: number, 
        public y: number, 
        public type: string = null,
        public fontFamily: string = null,
        public fontSize: string = null
    ) {
        // leave it empty for now
    }

    public update() {
        var ctx: CanvasRenderingContext2D = myGameArea.context;

        if (this.type == 'text') {
            ctx.font = this.fontFamily + ' ' + this.fontSize;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        }else if(this.type == 'png') {
            ctx.drawImage(myGameArea.fishSprite, this.x, this.y, this.width, this.height);
        }else if(this.type == 'tree') {
            ctx.drawImage(myGameArea.woodSprite, this.x, this.y, this.width, this.height);
        }
        else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    public newPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }

    public hitBottom() {
        var rockbottom: number = myGameArea.canvas.height - this.height;
        
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }

    public crashWith = function(otherobj: any) {
        var myleft: number = this.x, 
            myright: number = this.x + this.width,
            mytop: number = this.y,
            mybottom: number = this.y + this.height,
            otherleft: number = otherobj.x,
            otherright: number = otherobj.x + otherobj.width,
            othertop: number = otherobj.y,
            otherbottom: number = otherobj.y + otherobj.height,
            crash: boolean = null;
            var crash = true;
            if ((mybottom < othertop) ||
                   (mytop > otherbottom) ||
                   (myright < otherleft) ||
                   (myleft > otherright)) {
               crash = false;
            }
            if( (mybottom > 530) || (mytop < 0) )
                crash = true;       
        return crash;
    }
}