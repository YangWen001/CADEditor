/**
 * Created by VENN on 2017/8/3.
 */

(function () {

	'use strict';

	var menu = new Menu({
			'emitter'	: emitter
		});

	var editor = new CADEditor({
		'container' : 'CADContainer',
		'emitter'	: emitter,
		'menu' 	 	: menu
	});

	editor.addEventListener( 'save', function ( file ) {

		console.log( file );

	});

})();