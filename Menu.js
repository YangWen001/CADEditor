/**
 * Created by VENN on 2017/8/9.
 */
function Menu( options ) {

	if ( !options ){

		options = {};

	}

	var emitter = options.emitter;

	var menuContainer = document.createElement( 'div' );

	menuContainer.style.position = 'absolute';
	menuContainer.style.zIndex = '100';
	menuContainer.style.width = '100%';
	menuContainer.style.height = '32px';
	menuContainer.style.background = '#999';
	menuContainer.style.top = options.top ? options.top : '0px';
	menuContainer.style.left = options.top ? options.top : '0px';

	menuContainer.className = 'CADEditor-menu';

	var style = document.createElement( 'style' );

	var styleContent = '';
	styleContent += '.CADEditor-menu ul{';
	styleContent += 'padding:0;';
	styleContent += 'margin:0;';
	styleContent += '}';

	styleContent += '.CADEditor-menu li{';
	styleContent += 'cursor:pointer;';
	styleContent += '}';

	styleContent += '.CADEditor-menu>ul>li{';
	styleContent += 'list-style:none;';
	styleContent += 'display:inline-block;';
	styleContent += 'vertical-align:top;';
	styleContent += 'position:relative;';
	styleContent += 'width:80px;';
	styleContent += 'text-align:center;';
	styleContent += '}';

	styleContent += '.CADEditor-menu ul .item-name {';
	styleContent += 'line-height:32px;';
	styleContent += '}';

	styleContent += '.CADEditor-menu ul li .option{';
	styleContent += 'display:none;';
	styleContent += 'position:absolute;';
	styleContent += '}';

	styleContent += '.CADEditor-menu ul li .option li{';
	styleContent += 'background:#fff;';
	styleContent += 'border-top:1px solid #999;';
	styleContent += 'width:80px;';
	styleContent += 'text-align:center;';
	styleContent += '}';

	style.innerText = styleContent;

	document.head.appendChild( style );

	/**
	 <ul>
		<li>
	 		<span>文件</span>
	 		<ul>
	 			<li>新建</li>
	 			<li>保存</li>
	 			<li>重做</li>
	 		</ul>
	 	</li>
		 <li>
	 		<span>文件</span>
			 <ul>
				 <li>新建</li>
				 <li>保存</li>
				 <li>重做</li>
			 </ul>
		 </li>
	 </ul>
	*/
	var menuItems = document.createElement( 'ul' );

	//文件菜单

	var file = document.createElement( 'li' );

	var fileItemName = document.createElement( 'span');

		fileItemName.className = 'item-name';
		fileItemName.innerHTML = '文件';

		file.appendChild( fileItemName );


	var fileItems = document.createElement( 'ul' );
	fileItems.className = 'option';

	var newFileItem = document.createElement( 'li' );
	var saveFileItem = document.createElement( 'li' );
	var redoFileItem = document.createElement( 'li' );

	newFileItem.innerHTML = '新建';
	saveFileItem.innerHTML = '保存';
	redoFileItem.innerHTML = '重做';

	fileItems.appendChild( newFileItem );
	fileItems.appendChild( saveFileItem );
	fileItems.appendChild( redoFileItem );

	file.appendChild( fileItems );
	menuItems.appendChild( file );

	// 显示和藏菜单

	fileItemName.addEventListener( 'click', function () {

		fileItems.style.display = (fileItems.style.display == 'none' ? 'block' : 'none' );

	});

	//点击文件-保存按钮

	saveFileItem.addEventListener( 'click', function () {

		if ( emitter ){

			emitter.emit( SAVE_FILE_CHANNEL );
		}

	});

	//帮助菜单

	var help = document.createElement( 'li' );

	var helpItemName = document.createElement( 'span' );

		helpItemName.className = 'item-name';
		helpItemName.innerHTML = '帮助';

		help.appendChild( helpItemName );

	menuItems.appendChild( help );

	menuContainer.appendChild( menuItems );

	this.menuContainer = menuContainer;

}