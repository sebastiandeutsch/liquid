/**
 * @param {Object} context the 'this' value to be used.
 * @param {arguments} [1..n] optional arguments that are
 * prepended to returned function's call.
 * @return {Function} a function that applies the original
 * function with 'context' as the thisArg.
 */
Function.prototype.bind = function(context){
	var	fn = this, 
		ap, concat, args,
		isPartial = arguments.length > 1;
		
		// Strategy 1: just bind, not a partialApply
		if(!isPartial) {
		return function() {
				if(arguments.length !== 0) {
					return fn.apply(context, arguments);
			    } else {
			      return fn.call(context); // faster in Firefox.
			    }
			};
		} else {
		// Strategy 2: partialApply
		ap = Array.prototype,
		args = ap.slice.call(arguments, 1);
		concat = ap.concat;
		return function() {
			return fn.apply(context, 
		    	arguments.length === 0 ? args : 
		    	concat.apply(args, arguments));
		};
	}
};

if(!Liquid) {
	var Liquid = {};
}

Liquid.initialize = function(canvas, opts) {
	this.frame = 0;
	this.frameRate = 50;
	this.backgroundColor = '#000000';
	this.onEnterFrame = function() {};
	
	this.renderHandler = function() {
		this.onEnterFrame();
		this.frame++;
		
		this.stage.context.fillStyle = this.backgroundColor;
		this.stage.context.fillRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

		var sortedDisplayList = this.stage.displayList.sort(function(a, b) {
			if(a.zindex == b.zindex) return 0;
			if(a.zindex <  b.zindex) {
				return -1;
			} else {
				return 1;
			}
		});

		for(var i=0;i<sortedDisplayList.length;i++) {
			sortedDisplayList[i].drawOnContext(this.stage.context);
		}
	}.bind(this);
	
	var canvas;
	if(typeof canvas == "object") {
		canvas = canvas;
	} else {
		canvas = document.getElementById(canvas); 
	}

	this.stage = new Liquid.Stage(canvas);	
	this.intervalHandler = setInterval(this.renderHandler, 1000/this.frameRate);
}
