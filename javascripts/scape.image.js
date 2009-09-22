if(!Scape) {
	var Scape = {};
}

Scape.Image = function(point, src, opts) {
	if(!opts) opts = {};

	this.point           = point;

	this.x				 = 0;
	this.y               = 0;
	
	this.camx			 = 0;
	this.camy			 = 0;
	this.camz			 = 0;
	
	this.brightness		 = 0;
	
	this.zindex          = 0;
	this.width 			 = undefined;
	this.height 		 = undefined;
	this.scale           = 1;
	this.mouseOver		 = false;
	
	this.image = new Image();
	this.image.src = src;
	
	var onLoadHandler = function(e) {
		this.width = this.image.width;
		this.height = this.image.height;
		
		if(opts.onLoad) {
			opts.onLoad.call(this, e);
		}
	}.bind(this);
	
	this.image.addEventListener('load', onLoadHandler, false);		
}

Scape.Image.prototype = {
	getWidth : function() {
		return(this.width * this.scale);
	},
	
	getHeight : function() {
		return(this.height * this.scale);
	},
	
	getOriginalWidth : function() {
		return(this.image.width);
	},
	
	getOriginalHeight : function() {
		return(this.image.height);
	},
	
	hitTest : function(x, y) {
		var w = this.width * this.scale;
		var h = this.height * this.scale;
		
		if(x > (this.x - w/2) && x < (this.x - w/2 + w) &&
		   y > (this.y - h/2) && y < (this.y - h/2 + h)) {
			this.mouseOver = true;
		} else {
			this.mouseOver = false;
		}
	},
	
	update : function(Camera) {
		this.camx = this.point.x - Camera.x;
		this.camy = this.point.y - Camera.y;
		this.camz = this.point.z - Camera.z;
		
		this.scale = (50*5500 / -this.camz) / this.getOriginalWidth();		
		this.brightness = -0.4 - this.camz/4000;

		this.x = ((800+10) * this.camx / (-this.camz)) + Camera.screenWidth/2;
		this.y = ((800+10) * this.camy / (-this.camz)) + Camera.screenHeight/2;
		this.zindex = this.point.z;
	},
	
	drawOnContext : function(context) {
		var w = this.getOriginalWidth() * this.scale;
		var h = this.getOriginalHeight() * this.scale;
				
		if(this.brightness >= 0.9 || w < 1 || w > 300) {
			
		} else {
			if(this.scale == 1) {
				context.drawImage(this.image, this.x - w/2, this.y - h/2);
			} else {
				context.drawImage(this.image, this.x - w/2, this.y - h/2, w, h);
			}

			context.fillStyle = "rgba(0,0,0," + this.brightness + ")";
			context.fillRect(this.x- w/2-1, this.y - h/2-1, w+2, h+2);
		}
	}
}