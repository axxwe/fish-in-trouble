//<reference src="engine.ts"/>

class EventHandler {
    static RegisterKeyPress(input: string){
       console.log(input);
    }
}

console.log(EventHandler.RegisterKeyPress('string'));
var body = (<HTMLScriptElement[]><any>document.getElementsByTagName('body'))[0];
body.addEventListener("keypress", myFunction);

function myFunction(key) {
	if(key.code == "Space") {
		
	}
}