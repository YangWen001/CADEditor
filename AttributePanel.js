/**
 * Created by VENN on 2017/8/9.
 */
function AttributePanel( options ) {

	if( !options.emitter ){

		console.error( 'undefind emitter for attribute panel');

		return ;

	}

	var emitter = options.emitter;

	//记录当前element

	var element;

	//记录位移值

	this.translate = {
		x : 0,
		y : 0
	};
	this.translateInputX;
	this.translateInputY;

	//记录缩放值

	this.scale = 1;
	this.scaleInput;

	//记录旋转值

	this.rotate = 0;
	this.rotateInput;

	//记录颜色值

	this.color = '#ffffff';
	this.colorInput;

	//记录元素的标签

	this.tag = '';
	this.tagInput;

	//panel

	var panel = this.create( options );

	var _this = this;

	emitter.addListener( SELECT_ELEMENT_CHANNEL, function ( message ) {

		_this.element = message.element;

		_this.update();

	});

	//监听位置变化

	this.translateInputX.addEventListener( 'change' , function () {

		_this.element.translate.x = parseInt( this.value );
		_this.element.update();

	});

	this.translateInputY.addEventListener( 'change' , function () {

		_this.element.translate.y =  parseInt( this.value );
		_this.element.update();

	});

	//监听旋转角的变化

	this.rotateInput.addEventListener( 'change' , function () {

		_this.element.rotate =  parseInt( this.value );
		_this.element.update();

	});

	//监听旋转角的变化

	this.scaleInput.addEventListener( 'change' , function () {

		_this.element.scale = parseInt( this.value );
		_this.element.update();

	});

	//监听颜色的变化

	this.colorInput.addEventListener( 'change' , function () {

		_this.element.color = this.value;
		_this.element.update();

	});

	//监听tag的变化

	this.tagInput.addEventListener( 'keyup' , function () {

		_this.element.color = this.value;
		_this.element.update();

	});

	//监听元素发生变化

	emitter.addListener( ELEMENT_CHANGED_CHNANNEL, function ( message ) {

		if ( message.element == _this.element ){

			_this.update();

		}

	});


	return panel;

}

//创建属性面板

AttributePanel.prototype.create = function ( options ) {

	//创建面板

	var panel = document.createElement( 'div' );

	panel.style.position = 'absolute';
	panel.style.background = '#ccc';
	panel.style.width = options.width ? options.width : '200px';
	panel.style.height = options.height ? options.height : '100%';
	panel.style.top = options.top ? options.top : '0px';
	panel.style.left = options.left ? options.left : '0px';

	var title = document.createElement( 'div' );
	title.innerHTML = '属性';
	title.style.height = '20px';
	title.style.lineHeight = '20px';
	title.style.padding = '10px';
	title.style.borderBottom = '1px solid #fff';

	panel.appendChild( title );

	//临时的dom

	var dom;

	//位置

	var translateContainer = document.createElement( 'div' );
	translateContainer.style.padding = '10px';

	var translateLabel = document.createElement( 'div' );
	translateLabel.innerHTML = '位置: ';
	translateLabel.style.display = 'inline-block';
	translateLabel.style.verticalAlign = 'middle';
	translateLabel.style.width = '25%';

	translateContainer.appendChild( translateLabel );

	//x label

	dom = document.createElement( 'div' );

	dom.style.width = '7.5%';
	dom.style.display = 'inline-block';
	dom.style.verticalAlign = 'middle';
	dom.style.textAlign = 'center';
	dom.innerHTML = 'x';

	translateContainer.appendChild( dom );

	// x input

	var translateInputX = document.createElement( 'input' );
	translateInputX.style.width = '30%';
	translateInputX.style.display = 'inline-block';
	translateInputX.style.verticalAlign = 'middle';
	translateInputX.style.boxSizing = 'border-box';

	translateInputX.setAttribute( 'type', 'number' );

	translateContainer.appendChild( translateInputX );

	this.translateInputX = translateInputX;

	// y label

	dom = document.createElement( 'div' );

	dom.style.width = '7.5%';
	dom.style.display = 'inline-block';
	dom.style.verticalAlign = 'middle';
	dom.style.textAlign = 'center';
	dom.innerHTML = 'y';

	translateContainer.appendChild( dom );

	// y input

	var translateInputY = document.createElement( 'input' );
	translateInputY.style.width = '30%';
	translateInputY.style.display = 'inline-block';
	translateInputY.style.verticalAlign = 'middle';
	translateInputY.style.boxSizing = 'border-box';

	translateInputY.setAttribute( 'type', 'number' );

	translateContainer.appendChild( translateInputY );

	this.translateInputY = translateInputY;

	panel.appendChild( translateContainer );

	//旋转

	var rotateContainer = document.createElement( 'div' );
	rotateContainer.style.padding = '10px';

	var rotateLabel = document.createElement( 'div' );
	rotateLabel.innerHTML = '旋转: ';
	rotateLabel.style.display = 'inline-block';
	rotateLabel.style.verticalAlign = 'middle';
	rotateLabel.style.width = '25%';

	rotateContainer.appendChild( rotateLabel );

	// rotate input

	var rotateInput = document.createElement( 'input' );
	rotateInput.style.width = '75%';
	rotateInput.style.display = 'inline-block';
	rotateInput.style.verticalAlign = 'middle';
	rotateInput.style.boxSizing = 'border-box';

	rotateInput.setAttribute( 'type', 'number' );

	rotateContainer.appendChild( rotateInput );

	this.rotateInput = rotateInput;

	panel.appendChild( rotateContainer );

	//缩放

	var scaleContainer = document.createElement( 'div' );
	scaleContainer.style.padding = '10px';

	var scaleLabel = document.createElement( 'div' );
	scaleLabel.innerHTML = '缩放: ';
	scaleLabel.style.display = 'inline-block';
	scaleLabel.style.verticalAlign = 'middle';
	scaleLabel.style.width = '25%';

	scaleContainer.appendChild( scaleLabel );

	// scale input

	var scaleInput = document.createElement( 'input' );
	scaleInput.style.width = '75%';
	scaleInput.style.display = 'inline-block';
	scaleInput.style.verticalAlign = 'middle';
	scaleInput.style.boxSizing = 'border-box';

	scaleInput.setAttribute( 'type', 'number' );

	scaleContainer.appendChild( scaleInput );

	this.scaleInput = scaleInput;

	panel.appendChild( scaleContainer );

	//颜色

	var colorContainer = document.createElement( 'div' );
	colorContainer.style.padding = '10px';

	var colorLabel = document.createElement( 'div' );
	colorLabel.innerHTML = '颜色: ';
	colorLabel.style.display = 'inline-block';
	colorLabel.style.verticalAlign = 'middle';
	colorLabel.style.width = '25%';

	colorContainer.appendChild( colorLabel );

	// color input

	var colorInput = document.createElement( 'input' );
	colorInput.style.width = '75%';
	colorInput.style.display = 'inline-block';
	colorInput.style.verticalAlign = 'middle';
	colorInput.style.boxSizing = 'border-box';

	colorInput.setAttribute( 'type', 'color' );

	colorContainer.appendChild( colorInput );

	this.colorInput = colorInput;

	panel.appendChild( colorContainer );

	//tag

	var tagContainer = document.createElement( 'div' );
	tagContainer.style.padding = '10px';

	var tagLabel = document.createElement( 'div' );
	tagLabel.innerHTML = 'TAG: ';
	tagLabel.style.display = 'inline-block';
	tagLabel.style.verticalAlign = 'middle';
	tagLabel.style.width = '25%';

	tagContainer.appendChild( tagLabel );

	// scale input

	var tagInput = document.createElement( 'input' );
	tagInput.style.width = '75%';
	tagInput.style.display = 'inline-block';
	tagInput.style.verticalAlign = 'middle';
	tagInput.style.boxSizing = 'border-box';

	tagInput.setAttribute( 'type', 'text' );

	tagContainer.appendChild( tagInput );

	this.tagInput = tagInput;

	panel.appendChild( tagContainer );

	return panel;

};

//更新面板

AttributePanel.prototype.update = function () {

	if ( !this.element ){

		this.translateInputX.value = '';
		this.translateInputY.value = '';
		this.rotateInput.value = '';
		this.scaleInput.value = '';
		this.colorInput.value = '#fff';
		this.tagInput.value = '';

	}else {

		this.translateInputX.value = this.element.translate.x;
		this.translateInputY.value = this.element.translate.y;
		this.rotateInput.value = this.element.rotate;
		this.scaleInput.value = this.element.scale;
		this.colorInput.value = this.element.color;
		this.tagInput.value = this.element.tag;

	}

};
