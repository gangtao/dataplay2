// Manage all event
define([], function() {
	var eventMap = {};

    var Bus = {
    	trigger : function(event){
    		console.log("trigger and event handle " + event);

    		if ( !eventMap[event] ) {
    			return;
    		}

    		eventMap[event].map(function(handler) {
    			handler();
    		});
    	},

    	register : function(event, handler) {
    		if ( !eventMap[event] ) {
    			eventMap[event] = [];
    		}
    		eventMap[event].push(handler);
    	},

    	unregister: function(event, handler) {
    		if ( !eventMap[event] ) {
    			return;
    		}

    		var index = eventMap[event].indexOf(handler);
    		if (index > -1) {
			    array.splice(index, 1);
			}
    	},

    	clear: function(event) {
    		if ( !eventMap[event] ) {
    			return;
    		}

    		eventMap[event] = [];
    	}
    };

    return Bus;
});