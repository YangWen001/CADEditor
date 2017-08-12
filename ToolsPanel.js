/**
 * Created by VENN on 2017/8/9.
 */

function ToolsPanel( options ) {

	var emitter = options.emitter;

	var container = document.createElement( 'div' );

	container.style.width = options.width ? options.width : "100px" ;
	container.style.height = options.width ? options.width : "100%" ;
	container.style.background = '#95CACA';
	container.style.position = 'absolute';
	container.style.top = options.top ? options.top : '32px';

	//折线工具

	var polyLineTool = document.createElement( 'div' );
		polyLineTool.style.display = 'inline-block';
		polyLineTool.style.verticalAlign = 'top';
		polyLineTool.style.width = '50px';
		polyLineTool.style.height = '50px';
		polyLineTool.style.background = '#ccc';

	var polyLineImg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		polyLineImg.innerHTML = '<polyline points="5,25 45,25" stroke="#000" stroke-width="1" >';
		polyLineImg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );
		polyLineImg.setAttribute( 'version', '1.1' );
		polyLineImg.setAttribute( 'width', '50' );
		polyLineImg.setAttribute( 'height', '50' );

	polyLineTool.addEventListener( 'click', function () {

		emitter.emit( SELECT_TOOL_CHANNEL, {

			tool : 'PolyLine'

		})

	});

	polyLineTool.appendChild( polyLineImg );

	container.appendChild( polyLineTool );


	var tools = [{
		name: 'SwitcherElement',
		img : '<line stroke="#000"  y2="21" x2="25" y1="6" x1="25" stroke-width="1.5"/><line y2="47" x2="25.5" y1="29" x1="25.5" stroke-width="1.5" stroke="#000"/><line y2="17" x2="33.5" y1="30" x1="25.5" stroke-width="1.5" stroke="#000"/>',
	},{
		name: 'Switcher2',
		img : '<g xmlns="http://www.w3.org/2000/svg"><line y2="19.500241" x2="25.062497" y1="1.001053" x1="24.937503" stroke-width="1.5" stroke="#000"/> <line y2="47.873997" x2="25.062497" y1="31.124731" x1="24.937503" stroke-width="1.5" stroke="#000"/> <line y2="16.750362" x2="12.438053" y1="31.499715" x1="24.81251" stroke-width="1.5" stroke="#000"/> <line y2="11.375598" x2="29.5623" y1="15.625411" x1="20.437701" stroke-width="1.5" stroke="#000"/> <line y2="15.125433" x2="29.5623" y1="19.375247" x1="20.437701" stroke-width="1.5" stroke="#000"/> <line y2="7.250779" x2="28.999824" y1="11.625587" x1="20.125214" stroke-width="1.5"/></g>'
	},{
		name: 'DoubleWindingTransferElement',
		img : '<g xmlns="http://www.w3.org/2000/svg"><path stroke="#00f" xmlns="http://www.w3.org/2000/svg" d="M30 50 A 10 10 0 0 1 50 50" fill="none"></path></g>'
	}];


	for( var i in tools ){

		var tool = document.createElement( 'div' );

		tool.setAttribute( 'draggable', true);
		tool.setAttribute( 'name', tools[i].name );

		tool.style.display = 'inline-block';
		tool.style.verticalAlign = 'top';
		tool.style.width = '50px';
		tool.style.height = '50px';
		tool.style.background = '#ccc';
		tool.style.background = '#ccc';


		var img = document.createElementNS(  'http://www.w3.org/2000/svg', 'svg' );
		img.innerHTML = tools[i].img;
		img.setAttribute( 'width', '50' );
		img.setAttribute( 'height', '50' );
		tool.appendChild( img );

		tool.addEventListener( 'dragstart', function ( event ) {

			event.dataTransfer.setData("text", this.getAttribute( 'name' ));

		} );

		container.appendChild( tool );
	}

	return container;

}
