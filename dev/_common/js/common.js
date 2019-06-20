const banner = document.getElementById('banner')
const size = {w:banner.offsetWidth, h:banner.offsetHeight}

TweenLite.defaultEase = Power1.easeInOut
TweenLite.set('.screen', {width:185, x:3, y:3})
TweenLite.set('.frame', {opacity:0})
var _type = null


function screen_rotate(){

	
	let list = []
	switch(_type){
		case 'generic':
		list = ['got', 'det', 'strange']
		break;

		case 'crave':
		list = ['det']
		break;

		case 'sportsnet':
		list = ['det']
		break;
	}
	let i = 0
	
	TweenMax.to({}, 0.8, {
		  repeat: 6,
		  onRepeat: ()=> {
		  	i++
		  	if(i>=list.length){
		  		i=0
		  	}
		    const name = list[i]
		    
		    list.map(item=>{
		    	TweenMax.set(`.${item}`, {zIndex:0})
		    })

		    TweenMax.set(`.${name}`, {zIndex:11})	
		    

		  }
		});

}




function getInfo(type, size){
	const read = {
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
		},

		
	}

	_type = type	
	return {read:read[type]}
}




export {size, screen_rotate, getInfo}