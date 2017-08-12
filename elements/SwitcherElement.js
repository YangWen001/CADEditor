/**
 * Created by VENN on 2017/8/8.
 */
function SwitcherElement ( emitter ) {

	this.attrs = {
		'xmlns' : 'http://www.w3.org/2000/svg',
		'd' : 'M 25 0 L 25 20 M 38 18 L 25 32 V 50',
	};

	Element.call(this, emitter);

}

SwitcherElement.prototype = Element.prototype;
