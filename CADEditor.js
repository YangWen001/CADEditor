/**
 * Created by VENN on 2017/8/5.
 */

function CADEditor ( options ) {
	this.container = null;
	this.canvas = null;
	this.emitter = null;

	if ( !options.container ){

		console.error( 'undefined container for editor' );
		return false;

	}

	if ( !options.emitter ){

		console.error( 'undefined emitter ' );
		return false;

	}

	var _this = this;

	this.emitter = options.emitter;

	this.container = document.getElementById( options.container );
	this.container.style.userSelect = 'none';
	this.container.style.mozUserSelect = 'none';
	this.container.style.msUserSelect = 'none';
	this.container.style.webkitUserSelect = 'none';
	this.container.style.webkitTouchCallout = 'none';

	//暴露给外部监听的事件，并保存事件的回调

	this.events = {

		'save' : []

	};

	//保存所有的元素

	this.elements = [];

	//保存所有工具

	this.tools = {
		POLY_LINE : 'PolyLine'
	};

	//记录当前被选中的工具

	this.currentTool = null;

	//记录是否有正在画的线

	this.hasDrawingPolyLine = false;

	//添加菜单栏

	var menu = new Menu( {
		emitter : emitter
	} );

	this.container.appendChild( menu.menuContainer );

	//添加工具面板

	var toolsPanel = new ToolsPanel( {
		emitter : emitter
	} );

	this.container.appendChild( toolsPanel );

	//添加属性面板

	var attributePanel = new AttributePanel( {

		height : (this.container.offsetHeight - 32) + 'px',
		left : (this.container.offsetWidth - 200) + 'px',
		top : '32px',
		emitter : emitter

	} );

	this.container.appendChild( attributePanel );

	//创建画布

	this.canvas = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
	this.canvas.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );
	this.canvas.setAttribute( 'version', '1.1' );
	this.canvas.setAttribute( 'tabindex', '1' );

	//设置画布的样式

	this.canvas.style.outline = 'none';
	this.canvas.style.position = 'absolute';
	this.canvas.style.top = '32px';
	this.canvas.style.left = '100px';

	//默认画布的尺寸和容器的一样

	this.canvasWidth = this.container.offsetWidth - 100 - 200;
	this.canvasHeight = this.container.offsetHeight - 32;

	this.container.appendChild( this.canvas );
	this.setCanvasSize();

	//记录鼠标上次所在的位置(基于画布)

	var lastMousePoint;

	//广播鼠标按下事件

	this.canvas.addEventListener( 'mousedown', function ( e ) {

		lastMousePoint = {
			x : e.offsetX,
			y : e.offsetY
		};

		var target = e.target;

		if ( _this.currentTool == _this.tools.POLY_LINE ){

			if( !_this.hasDrawingPolyLine ){

				_this.hasDrawingPolyLine = true;
				var polyLine = new PolyLineElement( {
					emitter : _this.emitter ,
					translate : lastMousePoint
				} );
				polyLine.shape.style.outline = '1px #999 dashed';
				polyLine.selected = true;
				_this.addElement( polyLine );

			}else {

				_this.emitter.emit( USE_LINE_POINT_CHANNEL, lastMousePoint );

			}


		}else{

			_this.emitter.emit( MOUSE_DOWN_CHANNEL, {
				target : target,
				point : lastMousePoint,
				ctrlKey : e.ctrlKey
			});

		}

	});

	//广播鼠标弹起事件

	this.canvas.addEventListener( 'mouseup', function ( e ) {

		_this.emitter.emit( MOUSE_UP_CHANNEL, {

			ctrlKey : e.ctrlKey

		});

	});

	//广播鼠标移动事件（鼠标按下的状态才广播）

	this.canvas.addEventListener( 'mousemove', function ( e ) {


		//如果当前是已经选中了画线工具 广播画线的事件

		if( _this.currentTool == _this.tools.POLY_LINE ){

			if ( _this.hasDrawingPolyLine ){

				_this.emitter.emit( TEMP_LINE_POINT_CHANNEL, {

					x : e.offsetX,
					y : e.offsetY

				})

			}

		}else if ( !( e.buttons == 0 && e.button == 0) ){

			var dx = e.offsetX - lastMousePoint.x;
			var dy = e.offsetY - lastMousePoint.y;

			lastMousePoint = {
				x : e.offsetX,
				y : e.offsetY
			};

			var d = {
				dx : dx,
				dy : dy
			};
			_this.emitter.emit( MOVE_CHANNEL, d );

		}

	});

	//广播键盘方向键的事件

	this.canvas.addEventListener( 'keydown', function ( e ) {

		var ARROW_UP = 38;
		var ARROW_DOWN = 40;
		var ARROW_LEFT = 37;
		var ARROW_RIGHT = 39;
		var ENTER = 13;

		var KEY_CODE = e.keyCode;

		//移动

		if ( KEY_CODE == ARROW_UP ||
			KEY_CODE == ARROW_DOWN ||
			KEY_CODE == ARROW_LEFT ||
			KEY_CODE == ARROW_RIGHT ){

			//如果同时按下了CTRL键 则广播缩放消息
			//如果同时按下了SHIFT键 则广播旋转消息
			//否则广播移动消息

			if ( e.ctrlKey ){

				var times;
				if( KEY_CODE == ARROW_UP || KEY_CODE ==  ARROW_RIGHT ){

					times = 0.1;

				}else {

					times = -0.1;

				}

				_this.emitter.emit( SCALE_CHANNEL, {
					times : times
				});

			}else if ( e.shiftKey ){

				var radian;
				if( KEY_CODE == ARROW_UP || KEY_CODE == ARROW_RIGHT ){

					radian = 1;

				}else {

					radian = -1;

				}

				_this.emitter.emit( ROTATE_CHANNEL, {
					radian : radian
				});

			}else {

				var dx = 0;
				var dy = 0;

				if( KEY_CODE == ARROW_UP){

					dy = -5;

				}else if( KEY_CODE == ARROW_DOWN){

					dy = 5;

				}else if( KEY_CODE == ARROW_LEFT){

					dx = -5;

				}else if( KEY_CODE == ARROW_RIGHT){

					dx = 5;

				}

				_this.emitter.emit( MOVE_CHANNEL, {
					dx : dx,
					dy : dy
				});

			}

		}


		//回车

		if( KEY_CODE == ENTER ){

			if ( _this.hasDrawingPolyLine ){

				_this.hasDrawingPolyLine = false;
				_this.currentTool = null;
				emitter.emit( FINISH_LINE_CHANNEL );

			}

		}

		e.stopPropagation();
		e.preventDefault();
	});

	//阻止默认行为

	this.canvas.addEventListener( 'dragover', function ( e ) {

		e.preventDefault();
		return true;

	});


	//监听drop事件

	this.canvas.addEventListener( 'drop', function ( e ) {

		var element = e.dataTransfer.getData("text");

		var point = {

			x : e.offsetX - 25,
			y : e.offsetY - 25
		}

		element = new window[element]( { emitter : _this.emitter, translate : point });

		_this.addElement( element );

	});

	//监听保存事件

	this.emitter.addListener( SAVE_FILE_CHANNEL, function () {

		var file = _this.serialize();

		var callbacks = _this.events[ 'save' ];

		for (var i in callbacks ){

			if ( callbacks.hasOwnProperty(i) ){

				callbacks[i]( file );

			}
		}

	})

	//监听选择了工具

	this.emitter.addListener( SELECT_TOOL_CHANNEL, function ( message ) {

		if ( message.tool === _this.tools.POLY_LINE ){

			_this.currentTool  = _this.tools.POLY_LINE;

		}

	})

}

//设置画布的尺寸

CADEditor.prototype.setCanvasSize = function () {

	this.canvas.setAttribute( 'width', this.canvasWidth );
	this.canvas.setAttribute( 'height', this.canvasHeight );

};


//新增元素

CADEditor.prototype.addElement = function( element ){

	this.elements.push( element );
	this.canvas.appendChild( element.shape );

};

//序列化图像

CADEditor.prototype.serialize = function () {

	//首先序列化canvas本身的信息

	var canvas = {
		width : this.canvasWidth,
		height : this.canvasHeight
	};

	//序列化elements的信息

	var elements = [];

	for ( var i in this.elements ){

		elements.push( this.elements[i].serialize() );

	}

	return {

		canvas : canvas,
		elements : elements

	}

};

//让用户监听一些事件
CADEditor.prototype.addEventListener = function( event, callback ){

	if ( typeof callback !== 'function' ){
		return;
	}

	if ( this.events[ event ] ){

		this.events[ event ].push( callback );

	}

};