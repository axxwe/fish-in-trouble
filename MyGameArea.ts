class MyGameArea {
    
    public distanceElements: number          = 0;

    public gameSpeed: number                 = 0;

    public context: CanvasRenderingContext2D = null;
    
    public frameNo: number                   = 0;
    
    public canvas: HTMLCanvasElement         = document.createElement('canvas');
    
    public interval: number                  = null;

    // public fishSprite:HTMLImageElement       = document.createElement('img');

    public fishSprite: BetaFish              = new BetaFish(159, 130, FishColor.GREEN);

    public woodSprite:HTMLImageElement       = document.createElement('img');

    public fishNetSprite:HTMLImageElement    = document.createElement('img');

    // public function __construct
    constructor() {
        this.woodSprite.src    = 'img/tree.jpg';
        this.gameSpeed         = 10;
    }

    // public function start
    public start() {
        this.canvas.width = 880;
        this.canvas.height = 530;
        this.distanceElements = 300;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(function() { updateGameArea(this.distanceElements);}, this.gameSpeed );
    }

    public clear() {
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
    }
}
