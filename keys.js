var key = {
	keys: {
		//numbers
		0: 48,
		1: 49,
		2: 50,
		3: 51,
		4: 52,
		5: 53,
		6: 54,
		7: 55,
		8: 56,
		9: 57,

		//alphabet
		Q: 81,
		W: 87,
		E: 69,
		R: 82,
		T: 84,
		Y: 89,
		U: 85,
		I: 73,
		O: 79,
		P: 80,
		A: 65,
		S: 83,
		D: 68,
		F: 70,
		G: 71,
		H: 72,
		J: 74,
		K: 75,
		L: 76,
		Z: 90,
		X: 88,
		C: 67,
		B: 66,
		N: 78,
		M: 77,

		//special characters
		semicolon		: 186,
		equal			: 187,
		comma			: 188,
		dash			: 189,
		period			: 190,
		forwardSlash	: 191,
		backSlash		: 220,
		graveAccent		: 192,
		openBracket		: 219,
		closeBracket	: 221,
		singleQuote		: 222,

		//special keys:
		backspace	: 8,
		tab			: 9,
		enter		: 13,
		shift		: 16,
		crtl		: 17,
		alt			: 18,
		pause		: 19,
		caps		: 20,
		escape		: 27,
		pgup		: 33,
		pgdn		: 34,
		end			: 35,
		home		: 36,
		leftArrow	: 37,
		upArrow		: 38,
		rightArrow	: 39,
		downArrow	: 40,
		insert		: 45,
		del			: 46,
		numLock		: 144,
		scrollLock	: 145,

		//F keys
		F1	: 112,
		F2	: 113,
		F3	: 114,
		F4	: 115,
		F5	: 116,
		F6	: 117,
		F7	: 118,
		F8	: 119,
		F9	: 120,
		F10	: 121,
		F11	: 122,
		F12	: 123,

	},

	clock: {
		time: Date.now(),
		delta: 1,

		ticker: function(){
			requestAnimationFrame(key.clock.ticker);
			var currentTime = Date.now();
			var delta = -(key.clock.time - currentTime);
			key.clock.time = currentTime;
			key.clock.delta = delta;

			for(i in key.binds){
				if(key.binds[i].constant && key.binds[i].pressed){
					key.binds[i].constant(delta);
				}
			}
		},
	},

	on: function(keyPressed, when, func){

		key.binds[key.keys[keyPressed]] = key.binds[key.keys[keyPressed]] || {};

		switch(when) {
			case 'keydown' || 'onkeydown':
				key.binds[key.keys[keyPressed]].keyDown = func;
				break;
			case 'keyup' || 'onkeyup':
				key.binds[key.keys[keyPressed]].keyUp = func;
				break;
			case 'double' || 'ondouble':
				key.binds[key.keys[keyPressed]].onDouble = func;
				break;
			default:
				key.binds[key.keys[keyPressed]].constant = func;
				break;
		}
	},

	onDouble: function(keyPressed, func){
		if(key.binds[key.keys[keyPressed]] == undefined){
			key.binds[key.keys[keyPressed]] = {};
		}
		key.binds[key.keys[keyPressed]].onDouble = func;
	},

	binds: {},

	reset: function(){
		key.binds = {};
	},

	unbind: function(key){
		delete key.binds[key.keys[key]];
	},

	init: function(){
		var time = Date.now();

		var onKeyUp = function(e){
			e = window.event || e;
			if(key.binds[e.keyCode]){
				key.binds[e.keyCode].pressed = false;
				if(key.binds[e.keyCode].keyUp != undefined) {
					key.binds[e.keyCode].keyUp();
				}
			}
		};

		var onKeyDown = function(e){
			e = window.event || e;
			var now = Date.now();
			var delta = -(time - now);
			time = now;
			key.clock.ticker();
			if(key.binds[e.keyCode]){
				if(delta > 50 && delta < 200){
					if(key.binds[e.keyCode].onDouble != undefined) key.binds[e.keyCode].onDouble();
				}
				else{
					if(key.binds[e.keyCode].keyDown)	key.binds[e.keyCode].keyDown();
				}
			}

			if(key.binds[e.keyCode]){
				key.binds[e.keyCode].pressed = true;
			}
		};

		document.addEventListener( 'keydown', onKeyDown, false );
		document.addEventListener( 'keyup', onKeyUp, false );
	}
};
