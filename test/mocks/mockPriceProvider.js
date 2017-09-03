'use strict';

const Wreck = require('wreck');

module.exports = function priceProvider() {

	let values = {};

	let getValue = function(coin, onError, result) {
		result(values[coin].shift());
	}

	return {
		values,
		getValue
	}
}