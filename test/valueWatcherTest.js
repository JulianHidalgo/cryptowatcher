'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();

const coin = require('../coins');
const priceFormatter = require('../messageFormatters').priceFormatter;
const rateFormatter = require('../messageFormatters').rateFormatter;

let priceProvider = null;
let rateProvider = null;
let notificationSender = null;
let valueWatcher = require('../valueWatcher');
let valueWatcherOptions = {};

function setup() {
	priceProvider = require('./mocks/mockPriceProvider')();
	rateProvider = require('./mocks/mockRateProvider')();
	notificationSender = require('./mocks/mockNotificationSender')();
	valueWatcherOptions = {
		watcherName: 'Price Provider',
		pause: null,
		maxIterations: 1,
		watchedValues: [
			{ param: coin.edgeless.name, valuesProvider: priceProvider, valueTests: [(x) => { ld(x + " >= 0.74"); return x >= 0.74; }], message: priceFormatter('Edgeless') },
			{ param: coin.litecoin.name, valuesProvider: priceProvider, valueTests: [(x) => { ld(x + " >= 54"); return x >= 54; }], message: priceFormatter('Litecoin') }
		]
	};
}

function ld(msg) {
	//console.log(msg);
}

lab.experiment('Price Monitoring', () => {
	lab.test("Notification not sent if value is undefined or null", (done) => {	
		setup();

		priceProvider.values[coin.edgeless.name] = [undefined];
		priceProvider.values[coin.litecoin.name] = [null];
		valueWatcher(valueWatcherOptions, notificationSender);

		Lab.expect(notificationSender.sentMessages.length).to.equal(0);

		done();
	});


	lab.test("Price notification not sent if price hasn't changed", (done) => {	
		setup();
		valueWatcherOptions.maxIterations = 3;

		priceProvider.values[coin.edgeless.name] = [0.73, 0.73, 0.73];
		priceProvider.values[coin.litecoin.name] = [53, 53, 53];
		valueWatcher(valueWatcherOptions, notificationSender);

		Lab.expect(notificationSender.sentMessages.length).to.equal(2);
		Lab.expect(notificationSender.sentMessages[0]).to.equal('Edgeless = 0.73 (null) USD');
		Lab.expect(notificationSender.sentMessages[1]).to.equal('Litecoin = 53 (null) USD');

		done();
	});

	lab.test("Price notification sent if price has increased", (done) => {	
		setup();
		valueWatcherOptions.maxIterations = 4;

		priceProvider.values[coin.edgeless.name] = [0.73, 0.74, 0.74, 0.72];
		priceProvider.values[coin.litecoin.name] = [53, 54, 54, 52];
		valueWatcher(valueWatcherOptions, notificationSender);

		Lab.expect(notificationSender.sentMessages.length).to.equal(6);
		Lab.expect(notificationSender.sentMessages[0]).to.equal('Edgeless = 0.73 (null) USD');
		Lab.expect(notificationSender.sentMessages[1]).to.equal('Litecoin = 53 (null) USD');
		Lab.expect(notificationSender.sentMessages[2]).to.equal('Edgeless = 0.74 (0.73) USD');
		Lab.expect(notificationSender.sentMessages[3]).to.equal('Litecoin = 54 (53) USD');
		Lab.expect(notificationSender.sentMessages[4]).to.equal('Edgeless = 0.72 (0.74) USD');
		Lab.expect(notificationSender.sentMessages[5]).to.equal('Litecoin = 52 (54) USD');

		done();
	});

	lab.test("Price notification sent if price has decreased", (done) => {	
		setup();
		valueWatcherOptions.maxIterations = 3;
		valueWatcherOptions.watchedValues = [
			{ param: coin.edgeless.name, valuesProvider: priceProvider, valueTests: [(x) => { ld(x + " <= 0.74"); return x <= 0.74; }], message: priceFormatter('Edgeless') },
			{ param: coin.litecoin.name, valuesProvider: priceProvider, valueTests: [(x) => { ld(x + " <= 54"); return x <= 54; }], message: priceFormatter('Litecoin') }
		];

		priceProvider.values[coin.edgeless.name] = [0.75, 0.75, 0.745];
		priceProvider.values[coin.litecoin.name] = [55, 54, 54];
		valueWatcher(valueWatcherOptions, notificationSender);

		Lab.expect(notificationSender.sentMessages.length).to.equal(3);
		Lab.expect(notificationSender.sentMessages[0]).to.equal('Edgeless = 0.75 (null) USD');
		Lab.expect(notificationSender.sentMessages[1]).to.equal('Litecoin = 55 (null) USD');
		Lab.expect(notificationSender.sentMessages[2]).to.equal('Litecoin = 54 (55) USD');

		done();
	});
});

lab.experiment('Rate Monitoring', () => {
	lab.test("Notification not sent if value is undefined", (done) => {	
		setup();
		valueWatcherOptions.watchedValues = [
			{ param: 'edg_ltc', valuesProvider: rateProvider, valueTests: [(x) => { return x >= 0.0175; }], message: rateFormatter('EDG => LTC') }
		];

		rateProvider.values['edg_ltc'] = [undefined];
		valueWatcher(valueWatcherOptions, notificationSender);

		Lab.expect(notificationSender.sentMessages.length).to.equal(0);

		done();
	});

	lab.test("Rate notification not sent if rate hasn't changed", (done) => {	
		setup();
		valueWatcherOptions.maxIterations = 3;
		valueWatcherOptions.watchedValues = [
			{ param: 'edg_ltc', valuesProvider: rateProvider, valueTests: [(x) => { return x >= 0.75; }], message: rateFormatter('EDG => LTC') },
			{ param: 'ltc_edg', valuesProvider: rateProvider, valueTests: [(x) => { return x * 7.97 >= 600; }], message: rateFormatter('Changelly:  LTC => EDG') },
		];

		rateProvider.values['edg_ltc'] = [0.73, 0.73, 0.73];
		rateProvider.values['ltc_edg'] = [69, 69, 75.3];
		valueWatcher(valueWatcherOptions, notificationSender);

		Lab.expect(notificationSender.sentMessages.length).to.equal(3);
		Lab.expect(notificationSender.sentMessages[0]).to.equal('EDG => LTC = 0.73 (null)');
		Lab.expect(notificationSender.sentMessages[1]).to.equal('Changelly:  LTC => EDG = 69 (null)');
		Lab.expect(notificationSender.sentMessages[2]).to.equal('Changelly:  LTC => EDG = 75.3 (69)');

		done();
	});
});