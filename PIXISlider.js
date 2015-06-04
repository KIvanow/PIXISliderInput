var Slider = function( width, length, notCentered ){
		this.visual = new PIXI.Container();
		this.SLIDE_LENGTH = length;
		this.SLIDE_WIDTH = width;
		this.SLIDE_COL = 0x888888;
		this.SLIDE_X0 = 0;
		this.SLIDE_Y0 = this.SLIDE_WIDTH * 8;

		this.KNOB_COL = 0xaaaaaa;

		if( !notCentered ){
			this.SLIDE_X0 = Math.round( (window.innerWidth / 2) - this.SLIDE_LENGTH / 2 );
			this.visual.x = 0.1;
		}

		var slide = new PIXI.Graphics();
		slide.lineStyle( this.SLIDE_WIDTH, this.SLIDE_COL, 1);
		slide.moveTo( this.SLIDE_X0, this.SLIDE_Y0);
		slide.lineTo( this.SLIDE_X0 + this.SLIDE_LENGTH, this.SLIDE_Y0);

		var texture = PIXI.utils.TextureCache['./img/knob.png'];
		var knob = new PIXI.Sprite(texture);
		var that = this;
		knob.interactive = true;
		knob.buttonMode = true;
		knob.anchor.x = 0.5;
		knob.anchor.y = 0.5;
		knob.position.x = this.SLIDE_X0;
		knob.position.y = this.SLIDE_Y0;
		knob.width = knob.height = width * 2;

		// use the mousedown and touchstartthis.
		knob.mousedown = knob.touchstart = function(data){
			this.data = data;
			this.alpha = 0.9;
			this.dragging = true;
		};

		// set the events for when the mouse is released or a touch is released
		knob.mouseup = knob.mouseupoutside = knob.touchend = knob.touchendoutside = function(data){
			this.alpha = 1
			this.dragging = false;
			this.data = null;
		};

		// set the callbacks for when the mouse or a touch moves
		knob.mousemove = knob.touchmove = function(data){
			if(this.dragging){
			  	var newPosition = this.data.data.global;
		  		if (newPosition.x > that.SLIDE_X0 && newPosition.x < that.SLIDE_X0 + that.SLIDE_LENGTH) {
				    this.position.x = newPosition.x;
				}
			}
		}

		this.visual.addChild( slide );
		this.visual.addChild( knob );

		this.getSliderVal = function() {
			return parseInt((knob.position.x - that.SLIDE_X0) / that.SLIDE_LENGTH * 100);
		}

		this.setSliderVal = function( x ){
			knob.position.x = parseInt( x * that.SLIDE_LENGTH / 100 + that.SLIDE_X0);
		}

		return this
	};