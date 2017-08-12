/**
 * Created by VENN on 2017/8/3.
 */
 function Emitter() {

 	//频道

	this.channels = {};

}

//新增一个频道

Emitter.prototype.addChannel = function ( channelName ) {

 	if( this.channels[ channelName ] ){
 		return;
	}

	this.channels[ channelName ] = [];

};

//新增监听者

Emitter.prototype.addListener = function( channelName, callback ){

	var channel = this.channels[ channelName ];
	if( !channel ){
		console.error( "channel:" + channelName + " is not exists ");
		return ;
	}

	channel.push( callback );

};

//发送消息

Emitter.prototype.emit = function ( channelName, message) {

	console.log( channelName, message);

	var channel = this.channels[ channelName ];
	if( !channel ){
		console.error( "channel:" + channelName + " is not exists ");
		return ;
	}

	var listeners = channel;

	for( var i in listeners){

		if( listeners.hasOwnProperty( i )){

			if( typeof listeners[i] == 'function' ) {

				listeners[i]( message );

			}

		}

	}
};

