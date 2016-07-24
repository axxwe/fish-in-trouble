class Obstacle{

	public minHeight: number = 20;
	public maxHeight: number = 200;
	public height: number    = 0 ;
	public minGap: number    = 200;
	public maxGap:number     = 250;
	public x: number         = 0;
	public gap:number        = 0;


	constructor(){
		var gap:number = Math.floor(Math.random() * (this.maxGap - this.minGap + 1) + this.minGap);
		var height = Math.floor(Math.random() * (this.maxHeight - this.minHeight + 1) + this.minHeight);
		var x = myGameArea.canvas.width; 
	}

	public createObs(direction: string) {
		if(direction == 'up')
		{
			new Component(30, this.height, "", this.x, 0, 'tree');
		}
		if(direction == 'down')
        {
        	new Component(30, this.x - this.height - this.gap, "", this.x, this.height + this.gap, 'tree');
        }
	}

	
}