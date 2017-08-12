/**
 * Created by VENN on 2017/8/8.
 */
function Element( options ) {

	//缩放比

	this.scale = options.scale ? options.scale : 1;

	//坐标变换

	this.translate = options.translate ? options.translate : {x : 10,y : 10 };

	//旋转角

	this.rotate = options.rotate ? options.rotate : 0;

	//颜色

	this.color =  options.color ? options.color : '#0000ff';

	//tag

	this.tag = options.tag ? options.tag : '';

	//是否被选中

	this.selected = false;

	//svg对象

	this.shape;

	//svg里的图案 可以控制图案的颜色

	this.path;

	var _this = this;

	//监听鼠标点击事件
	emitter.addListener( SELECT_ELEMENT_CHANNEL, function ( message ) {

		if( message.target == _this.shape ){
			_this.shape.style.outline = '1px dashed #999';
			_this.selected = true;

		} else if ( message.target != _this.shape && !message.ctrlKey ){

			_this.shape.style.outline = 'none';
			_this.selected = false;
		}

	});

	//监听鼠标点击事件
	emitter.addListener( MOUSE_UP_CHANNEL, function ( message ) {

	});

	//监听移动的事件
	emitter.addListener( MOVE_CHANNEL, function ( message ) {

		if ( _this.selected ){

			_this.handleMove( message );
			emitter.emit( ELEMENT_CHANGED_CHNANNEL, {
				element : _this
			})

		}

	} );

	//监听旋转的事件
	emitter.addListener( ROTATE_CHANNEL, function ( message ) {

		if ( _this.selected ) {

			_this.handleRotate(message);

			emitter.emit( ELEMENT_CHANGED_CHNANNEL, {
				element : _this
			})
		}

	});

	//监听缩放的事件
	emitter.addListener( SCALE_CHANNEL, function ( message ) {

		if ( _this.selected ) {

			_this.handleScale(message);
			emitter.emit( ELEMENT_CHANGED_CHNANNEL, {
				element : _this
			})

		}

	});

	//监听颜色改变的事件
	emitter.addListener( CHANGE_COLOR_CHANNEL, function ( message ) {

		if ( _this.selected ) {

			_this.handleChangeColor(message);

		}

	});

	//监听tag改变的事件
	emitter.addListener( CHANGE_TAG_CHANNEL, function ( message ) {

		if ( _this.selected ) {

			_this.handleChangeTag(message);

		}

	});

	//创建图形
	this.createShape();

	//监听被点击事件

	this.shape.addEventListener( 'mousedown', function ( event ) {

		emitter.emit( SELECT_ELEMENT_CHANNEL, {

			target : _this.shape,
			element : _this

		})

	})

}

//处理移动的事件

Element.prototype.handleMove = function ( message ) {

	this.translate.x += message.dx;
	this.translate.y += message.dy;

	this.update();

};

//处理旋转的事件

Element.prototype.handleRotate = function ( message ) {

	this.rotate += message.radian;
	this.rotate %= 360;
	this.update();
};

//处理缩放的事件

Element.prototype.handleScale = function ( message ) {

	var times = this.scale + message.times;

	if ( times <= 0.2 ){

		return;

	}

	this.scale = times;

	this.update();

};

//处理颜色改变的事件

Element.prototype.handleChangeColor = function ( message ) {

	this.color = message.color;
	this.update();

};

//处理颜色改变的事件

Element.prototype.handleChangeTag = function ( message ) {

	this.tag = message.tag;

};

//更新样式

Element.prototype.update = function () {

	var transform = '';
	transform += 'translate(' + this.translate.x + ',' + this.translate.y + ') ';
	transform += 'scale(' + this.scale + ') ';
	transform += 'rotate(' + this.rotate + ', 0, 0)';

	this.shape.setAttribute( 'transform', transform);

	this.path.setAttribute( 'stroke', this.color );


};

//创建图形

Element.prototype.createShape = function () {

	this.shape = document.createElementNS( 'http://www.w3.org/2000/svg',  'g' );

	this.shape.setAttribute( 'transform-origin', '50% 50%' );

	this.background = document.createElementNS( 'http://www.w3.org/2000/svg', 'rect' );
	this.background.setAttribute( 'width', '50' );
	this.background.setAttribute( 'height', '50' );
	this.background.setAttribute( 'fill', 'transparent' );
	this.shape.appendChild( this.background );

	this.path = document.createElementNS( 'http://www.w3.org/2000/svg',  'path' );

	this.path.setAttribute( 'stroke', this.color );
	this.path.setAttribute( 'fill', 'none' );

	var attrs = this.attrs;

	for ( var i in attrs ){

		if ( attrs.hasOwnProperty( i) ){

			this.path.setAttribute( i, attrs[i] );

		}

	}

	this.shape.appendChild( this.path );

	this.update();

	return this.shape;

};

//序列化为一个对象

Element.prototype.serialize = function () {

	var element = {};

	element.points = this.points;
	element.translate = this.translate;
	element.scale = this.scale;
	element.rotate = this.rotate;

	return element;
};