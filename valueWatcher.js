'use strict';

module.exports = function valueWatcher(options, notificationSender) {
	var watch = function watch(i, options) {		
		for (let watchedValue of watchedValues) {
			watchedValue.valuesProvider.getValue(
				watchedValue.param, 
		        (err) => {
					console.log(err);
		        },
		        (value) => {	            
		            let sendNotification = false;
		            let important = true;
		            let newValue = value + ' (' + watchedValue.lastValue + ')';
		            if (typeof value !== 'undefined' && value != null) {
		            	if (watchedValue.lastValue == null && i == 1) {
			            	sendNotification = true;
			            	important = false;
			            }
			            else if (value != watchedValue.lastValue) {
			            	for (let valueTest of watchedValue.valueTests) {
			            		if (valueTest(value)) {
			            			sendNotification = true;
					            }
					            else if (valueTest(watchedValue.lastValue)) {
					            	sendNotification = true;
					            }
			            	}			            	
			        	}            
			            if (sendNotification) {
			        		notificationSender.send(watchedValue.message(newValue), important);
			        	}
		            }		            
		            watchedValue.lastValue = value;
		        }
		    );
		} 

	    if (options.maxIterations != null &&  i >= options.maxIterations) {
	    	return;
	    }
	    else if (options.pause != null) {
	    	//console.log('Waiting ' + options.pause + ' miliseconds...');
	    	setTimeout(watch, options.pause, i + 1, options);
	    }
	    else {
	    	watch(i + 1, options);	
	    }
	}

	console.log('Starting ' + options.watcherName);
	let watchedValues = options.watchedValues;

	for (let watchedValue of watchedValues) {
		watchedValue.lastValue = null;
	}

	watch(1, options);	
}