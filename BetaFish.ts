enum FishColor{
    RED = 0 ,
    YELLOW = 1,
    GREEN = 2
}

class BetaFish {

    private sprite: HTMLImageElement = document.createElement('img');

    private currentAnimationFrame:number = 0;

    private spriteWidth:number = 307;

    private spriteHeight:number = 317;

    constructor(private width: number, private height: number, private fishColor: FishColor = FishColor.RED) {
        this.sprite.src = 'img/beta-fish-sprite.png';

    }

    public nextAnimationFrame():void {
        this.currentAnimationFrame++;
        if (this.currentAnimationFrame == 16) {
            this.currentAnimationFrame = 0;
        }
    }

    public drawAtXY(x:number, y:number, ctx:CanvasRenderingContext2D) {

        // console.log(this.fishColor * this.spriteHeight, this.fishColor, this.spriteHeight);
        ctx.drawImage(
            this.sprite,
            this.currentAnimationFrame * this.spriteWidth,
            this.fishColor * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            x,
            y,
            this.width,
            this.height
        );
    }
}