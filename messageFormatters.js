'use strict';

exports.priceFormatter = function(coin) {
	return (value) => { return coin + ' = ' + value + ' BTC'; };
}

exports.rateFormatter = function(param) {
	return (value) => { return param + ' = ' + value; };
}
