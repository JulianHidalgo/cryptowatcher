'use strict';
const Promise = require("bluebird");
const Hapi = require('hapi');
const server = new Hapi.Server();
const bittrex = require('node.bittrex.api');
require('marko/node-require').install();
const dashboardTemplate = require('./lib/views/dashboard.marko');
const bittrexClient = require('./bittrexClient')();

server.connection({ port: 9000, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        let p = [];
        p.push(bittrexClient.getBalances());
        p.push(bittrexClient.getOrders());
        p.push(bittrexClient.getOrderBook());        
        p.push(bittrexClient.getOrderHistory());
        p.push(bittrexClient.getMarketHistory());
        Promise.all(p).then(function(result) {
            result = { balance: result[0], orders: result[1], orderBook: result[2], historicOrders: result[3], marketHistory: result[4] };
            return reply(dashboardTemplate.stream(result));
        });
    }
});

server.route({
    method: 'GET',
    path: '/orders',
    handler: function (request, reply) {
        bittrexClient.getOrders().then(function(result) {
            reply(result);
        });
    }
});

server.route({
    method: 'GET',
    path: '/balances',
    handler: function (request, reply) {
        bittrexClient.getBalances().then(function(result) {
            reply(result);
        });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
