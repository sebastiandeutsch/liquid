Liquid.Stage = function(canvas) {
	// set properties
	this.canvas = canvas;
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.context = this.canvas.getContext("2d");

	this.mousemoveFunctions  = [];
	this.mouseupFunctions    = [];
	this.mousedownFunctions  = [];
	this.mousewheelFunctions = [];

	this.displayList = [];
	
	// automaticall bind events
	var events = ['mousemove', 'mousedown', 'mouseup', 'mousewheel'];
	var bindEvent = function(name, fns) {
		var handler = function(e) {
			for(var j=0; j<fns.length; j++) {
				fns[j].call(this, e);
			}
		}.bind(this);
		this.canvas.addEventListener(name, handler, false);
	}.bind(this);
	for(var i=0;i<events.length; i++) {
		bindEvent(events[i], this[events[i] + "Functions"]);
	}		
}

Liquid.Stage.prototype = {
	addChild : function(displayObject) {
		// @todo sanity check for drawing method
		this.displayList.push(displayObject);
	},
	
	// wrapper for event handling
	mousemove  : function(fn)   { this.mousemoveFunctions.push(fn); },
	mousedown  : function(fn)   { this.mousedownFunctions.push(fn); },
	mouseup    : function(fn)   { this.mouseupFunctions.push(fn); },
	mousewheel : function(fn)   { this.mousewheelFunctions.push(fn); },
}