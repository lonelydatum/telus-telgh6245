(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commonJsMove_lbJs = require('../../_common/js/move_lb.js');

var _commonJsMove_lbJs2 = _interopRequireDefault(_commonJsMove_lbJs);

(0, _commonJsMove_lbJs2['default'])('netflix', 'lb');

module.exports = {};

},{"../../_common/js/move_lb.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var banner = document.getElementById('banner');
var size = { w: banner.offsetWidth, h: banner.offsetHeight };

TweenLite.defaultEase = Power1.easeInOut;

var _type = null;

function screen_rotate() {
	var list = [];
	switch (_type) {
		case 'generic':
			list = ['got', 'det', 'strange'];
			break;

		case 'crave':
			list = ['det'];
			break;
	}
	var i = 0;

	TweenMax.to({}, 0.8, {
		repeat: 6,
		onRepeat: function onRepeat() {
			i++;
			if (i >= list.length) {
				i = 0;
			}
			var name = list[i];

			list.map(function (item) {
				TweenMax.set('.' + item, { zIndex: 0 });
			});

			TweenMax.set('.' + name, { zIndex: 11 });
		}
	});
}

function getInfo(type, size) {
	var read = {
		generic: {
			t1: 2,
			t2: 3
		},
		crave: {
			t1: 2,
			t2: 3
		},
		netflix: {
			t1: 2,
			t2: 3
		}
	};

	_type = type;
	return { read: read[type] };
}

exports.size = size;
exports.screen_rotate = screen_rotate;
exports.getInfo = getInfo;

},{}],3:[function(require,module,exports){
'use strict';

var _commonJs = require('./common.js');

function start(type, size) {
	var _getInfo = (0, _commonJs.getInfo)(type, size);

	var read = _getInfo.read;

	var tl = new TimelineMax();
	// tl.set('.frame1', {opacity:1})

	var hop = { x: 90, y: 50 };
	var curviness = 2;
	var startX = -110;
	var startY = -0;

	var bez = [{ x: startX + hop.x * 1, y: startY - hop.y }, { x: startX + hop.x * 2, y: startY }];
	var bez2 = [{ x: startX + hop.x * 3, y: startY - hop.y }, { x: startX + hop.x * 4, y: startY }];

	tl.add("hop_1");
	tl.to('.monkey_hop', .4, { bezier: { curviness: curviness, values: bez }, ease: Sine.easeOut }, "hop_1");
	tl.to('.monkey_hop_shadow', .4, { opacity: .7, x: startX + hop.x * 2, ease: Sine.easeOut }, "hop_1");

	tl.add("hop_2", "+=.5");
	tl.to('.monkey_hop', .55, { bezier: { curviness: curviness, values: bez2 }, ease: Sine.easeOut }, "hop_2");
	tl.to('.monkey_hop_shadow', .4, { opacity: .5, x: startX + hop.x * 4, ease: Sine.easeOut }, "hop_2");
	tl.to(['.monkey_hop', '.monkey_hop_shadow'], .25, { opacity: 0 }, "+=.3");

	////////////////////////////
	// f2_in
	////////////////////////////
	tl.add('f2_in', "+=.5");
	tl.set('.frame2', { opacity: 1 }, 'f2_in');
	tl.from('.t1', .8, { opacity: 0, ease: Sine.easeOut }, 'f2_in');
	tl.from('.animalHolder', .4, { scale: 1, y: 130 });
	tl.to('.animalHolder', .3, { scale: 1.1, yoyo: true, left: 28, repeat: 1, ease: Sine.easeIn }, '-=.2');

	////////////////////////////
	// f2a_f2b
	////////////////////////////
	tl.add('f2a_f2b', '+=' + read.t1);
	tl.to('.t1', .5, { opacity: 0, ease: Power2.easeInOut }, 'f2a_f2b');
	tl.from('.t2', .5, { opacity: 0, ease: Power2.easeInOut });

	tl.to('.monkey_blink_close', .05, { opacity: 1, yoyo: true, repeat: 3, repeatDelay: .05 });
	tl.to('.monkey_blink_close', .05, { opacity: 1, yoyo: true, repeat: 3, repeatDelay: .05 }, '+=.5');

	tl.add('f2_out', '+=' + read.t2);
	tl.to('.frame2', .3, { opacity: 0 }, 'f2_out');

	////////////////////////////
	// f3_in
	////////////////////////////
	tl.add('f3_in', '+=1');
	tl.set('.frame3', { opacity: 1 });
	tl.from('.t3', .5, { opacity: 0, ease: Power2.easeInOut });

	tl.from('.monkey_popping_out', .4, { x: "+=40", ease: Power3.easeOut, onComplete: _commonJs.screen_rotate }, '+=1');
	tl.to('.monkey_popping_out', .2, { rotation: -2, yoyo: true, repeat: 1, ease: Sine.easeOut }, '-=.1');

	// tl.gotoAndPlay("f3_in")
}

module.exports = start;

},{"./common.js":2}]},{},[1])


//# sourceMappingURL=main.js.map
