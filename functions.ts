function startGame() {
    myGamePiece = new Component(126, 104, "", 30, 120, "fish");
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

function updateGameArea(distanceElements: number) {
    
    var x: number, 
        height: number, 
        gap: number, 
        minHeight: number, 
        maxHeight: number,
        minGap: number, 
        maxGap: number,
        i: number;
    
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo++;
    myGameArea.fishSprite.nextAnimationFrame();

    if (myGameArea.frameNo == 1 || everyinterval(myGameArea.distanceElements)) {
        myGameArea.distanceElements--;
        console.log(myGameArea.distanceElements);
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 200;
        maxGap = 250;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new Component(30, height, "", x, 0, 'tree'));
        myObstacles.push(new Component(30, x - height - gap, "", x, height + gap, 'tree'));
    }
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x--;
        myObstacles[i].update();
    }

    myScore.text="SCORE: " + myObstacles.length / 2;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function init()
{

}

