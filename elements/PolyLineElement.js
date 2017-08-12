/**
 * Created by VENN on 2017/8/9.
 */
function PolyLineElement( options ) {

	var emitter = options.emitter;

	var startPoint = options.translate;

	this.attrs = {
		'xmlns' : 'http://www.w3.org/2000/svg',
	};


	this.points = [];
	this.points.push( {x : 0, y : 0} );

	this.tempPoint = {x : 0, y : 0};

	var _this = this;

	Element.call(this, options);

	this.translate = startPoint;

	this.updateShape();

	//监听临时点

	emitter.addListener( TEMP_LINE_POINT_CHANNEL, function( message ){

		_this.handleTempPoint( message );

	} );

	//监听使用新点

	emitter.addListener( USE_LINE_POINT_CHANNEL, function ( message ) {

		_this.handleUsePoint( message );

	});

	//监听完成画线

	emitter.addListener( FINISH_LINE_CHANNEL, function () {

		_this.tempPoint = null;
		_this.shape.style.outline = 'none';
		_this.selected = false;
		_this.updateShape();

	})

}


PolyLineElement.prototype = Element.prototype;

//更新图形

PolyLineElement.prototype.updateShape = function () {

	var points = this.points;

	//用来计算背景正方形的尺寸和位置

	var left,
		top,
		right,
		bottom;

	var pointsAttr = '';

	right = left = points[0].x;
	bottom = top = points[0].y;

	for( var i in points ){

		if ( points.hasOwnProperty( i ) ) {

			pointsAttr += 'L'+ points[i].x + ' ' + points[i].y + ' ';


			//找到最左边的坐标

			if( points[i].x  < left ){

				left = points[i].x;
			}

			//找最右边的坐标

			if( points[i].x > right ){

				right = points[i].x;

			}

			//找最上边的坐标

			if ( points[i].y < top ){

				top = points[i].y;

			}

			//找最下边的坐标

			if ( points[i].y > bottom ){

				bottom = points[i].y;

			}
		}

	}

	//更新背景的rect

	var backgroundWidth = right - left;
	var backgroundHeight = bottom - top;
	var backgroundTop = top - 2;
	var backgroundLeft = top - 2;

	backgroundWidth += 4;
	backgroundHeight += 4;


	this.background.setAttribute( 'width', backgroundWidth.toString() );
	this.background.setAttribute( 'height', backgroundHeight.toString() );
	this.background.setAttribute( 'transform','translate(' + backgroundLeft + ' ' + backgroundTop + ')');

	if ( this.tempPoint ){
		pointsAttr += 'L' + this.tempPoint.x + ' ' + this.tempPoint.y + ' ';
	}

	pointsAttr = 'M' + pointsAttr.slice(1, -1);

	this.path.setAttribute( 'd', pointsAttr );

};


//处理收到临时点

PolyLineElement.prototype.handleTempPoint = function ( message ) {

	if( this.selected ) {

		var point = {
			x : message.x - this.translate.x,
			y : message.y - this.translate.y
		};

		this.tempPoint = point;
		this.updateShape();

	}

};

//处理收到使用点的消息

PolyLineElement.prototype.handleUsePoint = function ( message ) {

	if( this.selected ){

		var point = {
			x : message.x - this.translate.x,
			y : message.y - this.translate.y
		};


		this.points.push( point );
		this.updateShape();

	}

};

// //创建图形
//
// Element.prototype.createShape = function () {
//
// 	this.shape = document.createElementNS( 'http://www.w3.org/2000/svg',  'g' );
//
// 	this.shape.setAttribute( 'transform-origin', '50% 50%' );
//
// 	this.background = document.createElementNS( 'http://www.w3.org/2000/svg', 'rect' );
// 	this.background.setAttribute( 'width', '50' );
// 	this.background.setAttribute( 'height', '50' );
// 	this.background.setAttribute( 'fill', 'transparent' );
// 	this.shape.appendChild( this.background );
//
// 	this.path = document.createElementNS( 'http://www.w3.org/2000/svg',  'path' );
//
// 	this.path.setAttribute( 'stroke', this.color );
// 	this.path.setAttribute( 'fill', 'none' );
//
// 	var attrs = this.attrs;
//
// 	for ( var i in attrs ){
//
// 		if ( attrs.hasOwnProperty( i) ){
//
// 			this.path.setAttribute( i, attrs[i] );
//
// 		}
//
// 	}
//
// 	this.shape.appendChild( this.path );
//
// 	this.update();
//
// 	return this.shape;
//
// };


