'use strict';

const Wreck = require('wreck');

module.exports = function priceProvider() {

	var getValue = function(param, onError, result) {
		Wreck.get("https://api.coinmarketcap.com/v1/ticker/" + param + "/", 
	        { json: true },
	        (err, res, payload) => {
				if (err) {
	                onError(err);
	            }
	            
	            let value = null;
	            if (payload !== undefined && payload.length > 0) {
	            	value = payload[0].price_usd;
	            }
	            result(value);
	        }
	    );
	}

	return {
		getValue: getValue
	}
}