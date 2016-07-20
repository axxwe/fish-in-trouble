var MyGameArea = (function () {
    // public function __construct
    function MyGameArea() {
        this.distanceElements = 0;
        this.gameSpeed = 0;
        this.context = null;
        this.frameNo = 0;
        this.canvas = document.createElement('canvas');
        this.interval = null;
        this.fishSprite = document.createElement('img');
        this.woodSprite = document.createElement('img');
        this.fishNetSprite = document.createElement('img');
        this.fishSprite.src = 'fish.png';
        this.woodSprite.src = 'tree.jpg';
        this.fishNetSprite.src = 'net.gif';
        this.gameSpeed = 10;
    }
    // public function start
    MyGameArea.prototype.start = function () {
        this.canvas.width = 880;
        this.canvas.height = 530;
        this.distanceElements = 300;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(function () {
            updateGameArea(this.distanceElements);
        }, this.gameSpeed);
    };
    MyGameArea.prototype.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return MyGameArea;
}());
var Component = (function () {
    function Component(width, height, color, x, y, type, fontFamily, fontSize) {
        if (type === void 0) { type = null; }
        if (fontFamily === void 0) { fontFamily = null; }
        if (fontSize === void 0) { fontSize = null; }
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.type = type;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.score = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.text = null;
        this.crashWith = function (otherobj) {
            var myleft = this.x, myright = this.x + this.width, mytop = this.y, mybottom = this.y + this.height, otherleft = otherobj.x, otherright = otherobj.x + otherobj.width, othertop = otherobj.y, otherbottom = otherobj.y + otherobj.height, crash = null;
            var crash = true;
            if ((mybottom < othertop) ||
                (mytop > otherbottom) ||
                (myright < otherleft) ||
                (myleft > otherright)) {
                crash = false;
            }
            if ((mybottom > 530) || (mytop < 0))
                crash = true;
            return crash;
        };
        // leave it empty for now
    }
    Component.prototype.update = function () {
        var ctx = myGameArea.context;
        if (this.type == 'text') {
            ctx.font = this.fontFamily + ' ' + this.fontSize;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else if (this.type == 'png') {
            ctx.drawImage(myGameArea.fishSprite, this.x, this.y, this.width, this.height);
        }
        else if (this.type == 'tree') {
            ctx.drawImage(myGameArea.woodSprite, this.x, this.y, this.width, this.height);
        }
        else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    Component.prototype.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    };
    Component.prototype.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    };
    return Component;
}());
function startGame() {
    myGamePiece = new Component(126, 104, "", 30, 120, "png");
    myGamePiece.gravity = 0.05;
    myScore = new Component(0, 0, "black", 280, 40, "text", "30px", "Consolas");
    myGameArea.start();
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}
function accelerate(n) {
    myGamePiece.gravity = n;
}
function updateGameArea(distanceElements) {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap, i;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo++;
    // if((myObstacles.length / 2) % 10 == 0 ) {
    //     myGameArea.distanceElements--;
    //     console.log(myGameArea.distanceElements);
    // }
    if (myGameArea.frameNo == 1 || everyinterval(myGameArea.distanceElements)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 200;
        maxGap = 250;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new Component(30, height, "", x, 0, 'tree'));
        myObstacles.push(new Component(30, x - height - gap, "", x, height + gap, 'tree'));
    }
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x--;
        myObstacles[i].update();
    }
    myScore.text = "SCORE: " + myObstacles.length / 2;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}
function init() {
}
addEventListener("keydown", function (event) {
    var keyCode = event.keyCode;
    if (keyCode == 32) {
        accelerate(-0.2);
    }
    if (keyCode == 82) {
        init();
        console.log('reset');
    }
});
addEventListener("keyup", function (event) {
    var keyCode = event.keyCode;
    if (keyCode == 32) {
        accelerate(0.05);
    }
});
///<reference path="./MyGameArea.ts" />
///<reference path="./Component.ts" />
///<reference path="./functions.ts" />
///<reference path="./events.ts" />
var myGamePiece;
var myObstacles = [];
var myScore = null;
var myGameArea = new MyGameArea();
