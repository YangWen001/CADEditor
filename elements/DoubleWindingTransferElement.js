/**
 * Created by VENN on 2017/8/11.
 */
function DoubleWindingTransferElement ( emitter ) {

	this.shapeType = 'path';

	this.attrs = {
		'xmlns' : 'http://www.w3.org/2000/svg',
		'd' : 'M25 0 L25 10.4 M25 10.4 A 8 8 1 1 0 25.1 10.4 M19 21.5 A 8 8 1 1 0 19.1 21.5 M31 21.5 A 8 8 1 1 0 31.1 21.5 M19 38 V50 M31 38 L31 50',
	};

	Element.call(this, emitter);

}

DoubleWindingTransferElement.prototype = Element.prototype;
