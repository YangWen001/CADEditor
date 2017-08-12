/**
 * Created by VENN on 2017/8/9.
 */



//定义消息频道

var MOUSE_DOWN_CHANNEL = 1;
var MOUSE_UP_CHANNEL = 2;
var MOVE_CHANNEL = 3;
var SCALE_CHANNEL = 4;
var ROTATE_CHANNEL = 5;

var TEMP_LINE_POINT_CHANNEL = 6;
var USE_LINE_POINT_CHANNEL = 7;
var FINISH_LINE_CHANNEL = 8;

var SAVE_FILE_CHANNEL = 9;

var SELECT_TOOL_CHANNEL = 10;
var CANCEL_TOOL_CHANNEL = 11;

var SELECT_ELEMENT_CHANNEL = 12;
var UNSELECT_ELEMENT_CHANNEL = 13;

var CHANGE_COLOR_CHANNEL = 14;
var CHANGE_TAG_CHANNEL = 15;

var ELEMENT_CHANGED_CHNANNEL = 16;


var emitter = new Emitter();

//添加频道

emitter.addChannel( MOUSE_DOWN_CHANNEL );
emitter.addChannel( MOUSE_UP_CHANNEL );
emitter.addChannel( MOVE_CHANNEL );
emitter.addChannel( SCALE_CHANNEL );
emitter.addChannel( ROTATE_CHANNEL );
emitter.addChannel( TEMP_LINE_POINT_CHANNEL );
emitter.addChannel( USE_LINE_POINT_CHANNEL );
emitter.addChannel( FINISH_LINE_CHANNEL );
emitter.addChannel( SAVE_FILE_CHANNEL );
emitter.addChannel( SELECT_TOOL_CHANNEL );
emitter.addChannel( CANCEL_TOOL_CHANNEL );
emitter.addChannel( SELECT_ELEMENT_CHANNEL );
emitter.addChannel( UNSELECT_ELEMENT_CHANNEL );
emitter.addChannel( CHANGE_COLOR_CHANNEL );
emitter.addChannel( CHANGE_TAG_CHANNEL );
emitter.addChannel( ELEMENT_CHANGED_CHNANNEL );

