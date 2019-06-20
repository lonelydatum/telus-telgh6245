(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// import start from '../../_common/js/move_bb.js'

'use strict';

var _commonJsCommonJs = require('../../_common/js/common.js');

function start(type, size) {
	var _getInfo = (0, _commonJsCommonJs.getInfo)(type, size);

	var read = _getInfo.read;

	var tl = new TimelineMax();
	tl.set('.frame1', { opacity: 1 });

	var hop = { x: 110, y: 80 };
	var curviness = 2;
	var startX = -210;
	var startY = 60;

	var bez = [{ x: startX + hop.x * 1, y: startY - hop.y }, { x: startX + hop.x * 2, y: startY }];
	var bez2 = [{ x: startX + hop.x * 3, y: startY - hop.y }, { x: startX + hop.x * 4 + 70, y: startY }];

	// tl.to('.monkey_hop', .4, {bezier:{curviness, values:bez}, ease:Sine.easeOut})
	// tl.to('.monkey_hop', .4, {bezier:{curviness, values:bez2}, ease:Sine.easeOut}, "+=.5")
	// tl.to('.monkey_hop', .3, {opacity:0})

	tl.add("hop_1");
	tl.to('.monkey_hop', .4, { bezier: { curviness: curviness, values: bez }, ease: Sine.easeOut }, "hop_1");
	tl.to('.monkey_hop_shadow', .4, { opacity: .7, x: startX + hop.x * 2, ease: Sine.easeOut }, "hop_1");

	tl.add("hop_2", "+=.5");
	tl.to('.monkey_hop', .55, { bezier: { curviness: curviness, values: bez2 }, ease: Sine.easeOut }, "hop_2");
	tl.to('.monkey_hop_shadow', .4, { opacity: 0, x: startX + hop.x * 4 + 70, ease: Sine.easeOut }, "hop_2");
	tl.set('.monkey_hop', { opacity: 0 });

	////////////////////////////
	// f2_in
	////////////////////////////
	tl.add('f2_in', "+=.5");
	tl.set('.frame2', { opacity: 1 }, 'f2_in');
	tl.from('.t1', .3, { opacity: 0, ease: Sine.easeOut }, 'f2_in');
	tl.to('.t1', .3, { opacity: 0, ease: Sine.easeOut }, '+=' + read.t1);

	////////////////////////////
	// f2a_f2b
	////////////////////////////
	tl.add('f2a_f2b', '+=' + read.t2);

	tl.from('.t2', .3, { opacity: 0, ease: Power2.easeInOut });
	tl.to('.t2', .3, { opacity: 0, ease: Power2.easeInOut }, '+=3.1');

	tl.from('.animalHolder', .4, { scale: 1, y: 250 });
	tl.to('.animalHolder', .3, { scale: "+=.1", yoyo: true, top: '+=12', left: 8, repeat: 1, ease: Sine.easeIn }, '-=.2');
	tl.to('.monkey_blink_close', .05, { opacity: 1, yoyo: true, repeat: 3, repeatDelay: .05 });
	tl.to('.monkey_blink_close', .05, { opacity: 1, yoyo: true, repeat: 3, repeatDelay: .05 }, '+=.5');
	tl.to('.animalHolder', .6, { opacity: 0, ease: Power2.easeInOut }, '+=.6');

	// tl.add('f2_out', "+=1")
	// tl.to('.frame2', .3, {opacity:0}, 'f2_out')

	////////////////////////////
	// f3_in
	////////////////////////////
	// tl.add('f3_in', '+=1')
	tl.set('.frame3', { opacity: 1 });
	tl.from('.t3', .5, { opacity: 0, ease: Power2.easeInOut }, "+=.3");

	tl.from('.monkey_popping_out', .4, { x: "+=40", ease: Power3.easeOut, onComplete: _commonJsCommonJs.screen_rotate }, '+=1');
	tl.to('.monkey_popping_out', .2, { rotation: -2, yoyo: true, repeat: 1, ease: Sine.easeOut }, '-=.1');
	// tl.gotoAndPlay("f2_in")
	return tl;
}

start('crave', 'bb').gotoAndPlay("f2_in");

module.exports = {};

},{"../../_common/js/common.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var banner = document.getElementById('banner');
var size = { w: banner.offsetWidth, h: banner.offsetHeight };

TweenLite.defaultEase = Power1.easeInOut;
TweenLite.set('.screen', { width: 185, x: 3, y: 3 });
TweenLite.set('.frame', { opacity: 0 });
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

		case 'sportsnet':
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
			t1: 1,
			t2: 3
		},
		netflix: {
			t1: 1,
			t2: 3
		},
		sportsnet: {
			t1: 1,
			t2: 3
		}

	};

	_type = type;
	return { read: read[type] };
}

exports.size = size;
exports.screen_rotate = screen_rotate;
exports.getInfo = getInfo;

},{}]},{},[1])


//# sourceMappingURL=main.js.map
