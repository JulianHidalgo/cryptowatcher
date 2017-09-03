'use strict';
const Promise = require("bluebird");
const bittrex = require('node.bittrex.api');

const bittrexOptions = {
  'apikey' : 'API_KEY',
  'apisecret' : 'API_SECRET', 
  //'stream' : true, // will be removed from future versions 
  'verbose' : true,
  'cleartext' : false,
  'baseUrl' : 'https://bittrex.com/api/v1.1'
};
const openOrdersUrl = bittrexOptions.baseUrl + '/market/getopenorders';
const orderHistoryUrl = bittrexOptions.baseUrl + '/account/getorderhistory';

module.exports = function bittrexClient() {
    bittrex.options(bittrexOptions);

    function getOrders() {
       return new Promise(function(resolve, reject) {
            bittrex.sendCustomRequest(openOrdersUrl, function(ordersData ) {
                resolve(ordersData.result);
            }, true );
       });
    }

    function getMarketHistory() {
       return new Promise(function(resolve, reject) {
            bittrex.getmarkethistory({ market : 'BTC-DGB' }, function( marketHistoryData ) {
                resolve(marketHistoryData.result);
            });
       });
    }

    function getOrderHistory() {
       return new Promise(function(resolve, reject) {
            bittrex.sendCustomRequest(orderHistoryUrl, function(ordersData ) {
                resolve(ordersData.result);
            }, true );
       });
    }

    function getOrderBook() {
       return new Promise(function(resolve, reject) {
            bittrex.getorderbook({ market : 'BTC-DGB', depth : 1, type : 'both' }, function( orderBookData ) {
                resolve(orderBookData.result);
            });
       });
    }

    function getPrice(currency) {
        return new Promise(function(resolve, reject) {
            bittrex.getticker( { market : 'BTC-' + currency }, function(tickerData) {
                resolve(tickerData.result);
            });
       });
    }

    function addPrice(balance) {
        return new Promise(function(resolve, reject) {
            bittrex.getticker( { market : 'BTC-' + balance.Currency }, function(tickerData) {
                resolve(Object.assign(balance, tickerData.result));
            });
       });
    }

    function getBalances() {
        return new Promise(function(resolve, reject) {
            bittrex.getbalances(function(balanceData) {
                let tickers = [];
                for (let c of balanceData.result) {
                    if (c.Balance > 0 || c.Currency == 'DGB' 
                                      || c.Currency == 'BCC' 
                                      || c.Currency == 'PAY'
                                      || c.Currency == 'OMG'
                                      || c.Currency == 'NEO'
                                      || c.Currency == 'EDG' 
                                      || c.Currency == 'XEM') {
                        delete c.Pending;
                        delete c.Available;
                        delete c.CryptoAddress;
                        if (c.Currency != 'BTC' && c.Currency != 'USDT') {
                            tickers.push(addPrice(c));
                        }
                        else {
                            tickers.push(new Promise(function(resolve, reject) { resolve( Object.assign(c, {Bid:null,Ask:null,Last:null}) ); }));
                        }
                    }
                }
                Promise.all(tickers).then(function(result) {
                    resolve(result);
                });
            });
       });
    }

    return {
        addPrice,
        getBalances,
        getMarketHistory,
        getOrders,
        getOrderHistory,
        getOrderBook,
        getPrice
    }

}