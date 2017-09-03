'use strict';

const Wreck = require('wreck');

module.exports = function rateProvider() {

	let values = {};

	let getValue = function(pair, onError, result) {
		result(values[pair].shift());
	}

	return {
		values,
		getValue
	}
}