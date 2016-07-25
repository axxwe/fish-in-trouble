addEventListener("keydown", function(event){
        var keyCode:number = event.keyCode;
        if( keyCode == 32) {
        	accelerate(-0.2);
        }
        if( keyCode == 82) {
        	init();
		console.log('reset');
        }
});
addEventListener("keyup", function(event){
        var keyCode:number = event.keyCode;
        if( keyCode == 32) {
        	accelerate(0.05);
        }
});