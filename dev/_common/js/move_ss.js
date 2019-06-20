import {screen_rotate, getInfo} from './common.js'

function start(type, size){
	const {read} = getInfo(type, size)
	const tl = new TimelineMax()
	tl.set('.frame1', {opacity:1})
	
	const hop = {x:85,y:90}
	const curviness = 2
	const startX = -192
	const startY = 240

	const bez = [ {x:startX+(hop.x*1), y:startY-hop.y}, {x:startX+(hop.x*2), y:startY}]
	const bez2 = [ {x:startX+(hop.x*3), y:startY-hop.y}, {x:startX+(hop.x*4)+90, y:startY}]

	tl.add("hop_1")
 	tl.to('.monkey_hop', .4, {bezier:{curviness, values:bez}, ease:Sine.easeOut}, 'hop_1')
 	tl.to('.monkey_hop_shadow', .4, {opacity:.7, x:startX+(hop.x*2), ease:Sine.easeOut}, "hop_1")

 	tl.add("hop_2", "+=.5")
 	tl.to('.monkey_hop', .6, {bezier:{curviness, values:bez2}, ease:Sine.easeOut}, "hop_2")
 	tl.to('.monkey_hop_shadow', .6, {opacity:0, x:startX+(hop.x*4)+90, ease:Sine.easeOut}, "hop_2")
 	// tl.set('.monkey_hop',  {opacity:0})


	
	////////////////////////////
	// f2_in
	////////////////////////////
	tl.add('f2_in', "+=.5")
	tl.set('.frame2',  {opacity:1}, 'f2_in')
	tl.from('.t1', .8, {opacity:0, ease:Sine.easeOut}, 'f2_in')
	tl.from('.animalHolder', .4, {scale:1, y:681})
	tl.to('.animalHolder', .3, {scale:1.15, yoyo:true, top:'+=22', repeat:1, ease:Sine.easeIn}, '-=.2')

	
	////////////////////////////
	// f2a_f2b
	////////////////////////////
	tl.add('f2a_f2b', `+=${read.t1}`)
	tl.to('.t1', .5, {opacity:0, ease:Power2.easeInOut}, 'f2a_f2b')
	tl.from('.t2', .5, {opacity:0, ease:Power2.easeInOut})
	
	tl.to('.monkey_blink_close', .05, {opacity:1, yoyo:true, repeat:3, repeatDelay:.05})
	tl.to('.monkey_blink_close', .05, {opacity:1, yoyo:true, repeat:3, repeatDelay:.05}, '+=.5')
	

	tl.add('f2_out', `+=${read.t2}`)
	tl.to('.frame2', .3, {opacity:0}, 'f2_out')
	

	////////////////////////////
	// f3_in
	////////////////////////////
	tl.add('f3_in', '+=1')
	tl.set('.frame3', {opacity:1})
	tl.from('.t3', .5, {opacity:0, ease:Power2.easeInOut})

	tl.from('.monkey_popping_out', .4, {y:"+=45", ease:Power3.easeOut, onComplete:screen_rotate}, '+=1')
	tl.to('.monkey_popping_out', .3, {rotation:"-=7", yoyo:true, repeat:1, ease:Sine.easeOut}, '-=.2')
	// tl.gotoAndPlay("f3_in")

	return tl
}


module.exports = start;