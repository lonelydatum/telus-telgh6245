// import start from '../../_common/js/move_bb.js'

import {screen_rotate, getInfo} from '../../_common/js/common.js'


function start(type, size){
	const {read} = getInfo(type, size)
	const tl = new TimelineMax()
	tl.set('.frame1', {opacity:1})
	
	const hop = {x:110,y:80}
	const curviness = 2
	const startX = -210
	const startY = 60

	const bez = [ {x:startX+(hop.x*1), y:startY-hop.y}, {x:startX+(hop.x*2), y:startY}]
	const bez2 = [ {x:startX+(hop.x*3), y:startY-hop.y}, {x:startX+(hop.x*4)+70, y:startY}]

 	// tl.to('.monkey_hop', .4, {bezier:{curviness, values:bez}, ease:Sine.easeOut})
 	// tl.to('.monkey_hop', .4, {bezier:{curviness, values:bez2}, ease:Sine.easeOut}, "+=.5")
 	// tl.to('.monkey_hop', .3, {opacity:0})


 	tl.add("hop_1")
 	tl.to('.monkey_hop', .4, {bezier:{curviness, values:bez}, ease:Sine.easeOut}, "hop_1")
 	tl.to('.monkey_hop_shadow', .4, {opacity:.7, x:startX+(hop.x*2), ease:Sine.easeOut}, "hop_1")

 	tl.add("hop_2", "+=.5")
 	tl.to('.monkey_hop', .55, {bezier:{curviness, values:bez2}, ease:Sine.easeOut}, "hop_2")
 	tl.to('.monkey_hop_shadow', .4, {opacity:0, x:startX+(hop.x*4)+70, ease:Sine.easeOut}, "hop_2")
 	tl.set('.monkey_hop',  {opacity:0})


	
	////////////////////////////
	// f2_in
	////////////////////////////
	tl.add('f2_in', "+=.5")
	tl.set('.frame2',  {opacity:1}, 'f2_in')
	tl.from('.t1', .3, {opacity:0, ease:Sine.easeOut}, 'f2_in')
	tl.to('.t1', .3, {opacity:0, ease:Sine.easeOut}, `+=${read.t1}`)
	



	////////////////////////////
	// f2a_f2b
	////////////////////////////
	tl.add('f2a_f2b', `+=${read.t2}`)
	
	tl.from('.t2', .3, {opacity:0, ease:Power2.easeInOut})
	tl.to('.t2', .3, {opacity:0, ease:Power2.easeInOut}, '+=3.1')
	
	
	

	

	tl.from('.animalHolder', .4, {scale:1, y:250})
	tl.to('.animalHolder', .3, {scale:"+=.1", yoyo:true, top:'+=12', left:8, repeat:1, ease:Sine.easeIn}, '-=.2')
	tl.to('.monkey_blink_close', .05, {opacity:1, yoyo:true, repeat:3, repeatDelay:.05})
	tl.to('.monkey_blink_close', .05, {opacity:1, yoyo:true, repeat:3, repeatDelay:.05}, '+=.5')
	tl.to('.animalHolder', .6, {opacity:0, ease:Power2.easeInOut}, '+=.6')


	// tl.add('f2_out', "+=1")
	// tl.to('.frame2', .3, {opacity:0}, 'f2_out')
	

	////////////////////////////
	// f3_in
	////////////////////////////
	// tl.add('f3_in', '+=1')
	tl.set('.frame3', {opacity:1})
	tl.from('.t3', .5, {opacity:0, ease:Power2.easeInOut}, "+=.3")

	tl.from('.monkey_popping_out', .4, {x:"+=40", ease:Power3.easeOut, onComplete:screen_rotate}, '+=1')
	tl.to('.monkey_popping_out', .2, {rotation:-2, yoyo:true, repeat:1, ease:Sine.easeOut}, '-=.1')
	// tl.gotoAndPlay("f2_in")
	return tl
}


start('sportsnet', 'bb').gotoAndPlay("f2_in")


module.exports = {};



