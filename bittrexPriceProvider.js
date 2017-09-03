'use strict';

const bittrexClient = require('./bittrexClient')();

module.exports = function bittrexPriceProvider() {

    var getValue = function(param, onError, result) {
        bittrexClient.getPrice('DGB')
            .then(function(res) {
                result(res .Last);
            });
    }

    return {
      getValue: getValue
    }

}