'use strict';

const Wreck = require('wreck');

module.exports = function rateProvider() {

	var getValue = function(param, onError, result) {
		Wreck.get("https://shapeshift.io/rate/" + param, 
	        { json: true },
	        (err, res, payload) => {
				if (err) {
	                onError(err);
	            }
	            let rate = null;
	            if (payload !== undefined) {
	            	rate = payload.rate;
	            }
	            result(rate);
	        }
	    );
	}

	return {
		getValue: getValue
	}
}