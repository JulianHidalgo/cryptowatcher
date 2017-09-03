'use strict';

var Changelly = require('./changelly/');
var changelly = new Changelly(
    'API_KEY',
    'API_SECRET'
);

module.exports = function changellyRateProvider() {

    var getValue = function(param, onError, result) {
        changelly.getExchangeAmount(param[0], param[1], 1, function(err, data) {
            if (err) {
                onError(err);
            } 
            else {
                result(data.result);
            }
        });
    }

    return {
      getValue: getValue
    }

}
