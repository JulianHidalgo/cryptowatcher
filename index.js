'use strict';
const pause = 5 * 1000;
const coin = require('./coins');
const priceFormatter = require('./messageFormatters').priceFormatter;
const rateFormatter = require('./messageFormatters').rateFormatter;
const priceProvider = require('./priceProvider')();
const btcPriceProvider = require('./btcPriceProvider')();
const bittrexPriceProvider = require('./bittrexPriceProvider')();
const rateProvider = require('./rateProvider')();
const changellyRateProvider = require('./changellyRateProvider')();
const notificationSender = require('./notificationSender')( { sendEmail: false, sendPushNotification: true });

const watcherOptions = {
	watcherName: 'Price Provider',
	pause: pause,
	maxIterations: null,
	watchedValues: [
		// Rates
		//{ param: 'dgb_btc', valuesProvider: rateProvider, valueTests: [(x) => { return 19316 * x >= 0.103; }], message: rateFormatter('Shapeshift: DGB => BTC') },
		//{ param: 'btc_dgb', valuesProvider: rateProvider, valueTests: [(x) => { return 0.11640095 * x >= 20000; }], message: rateFormatter('Shapeshift: BTC => DGB') },
		//{ param: ['nlg', 'btc'], valuesProvider: changellyRateProvider, valueTests: [(x) => { return x * 3252 >= 0.115; }], message: rateFormatter('Changelly:  NLG => BTC') },
		//{ param: 'edg_ltc', valuesProvider: rateProvider, valueTests: [(x) => { return 2560 * x >= 44.49; }], message: rateFormatter('Shapeshift: EDG => LTC') },
		//{ param: ['edg', 'ltc'], valuesProvider: changellyRateProvider, valueTests: [(x) => { return 2560 * x >= 44.49; }], message: rateFormatter('Changelly:  EDG => LTC') },	
		//{ param: ['ltc', 'edg'], valuesProvider: changellyRateProvider, valueTests: [(x) => { return x * 7.97 >= 614; }], message: rateFormatter('Changelly:  LTC => EDG') },
		// Price
		//{ param: 'gulden', valuesProvider: priceProvider, valueTests: [(x) => { return x <= 0.075; } ], message: priceFormatter('Gulden') },	
		//{ param: 'bitcoin', valuesProvider: priceProvider, valueTests: [(x) => { return x >= 2000; }, (x) => { return x <= 1900; }], message: priceFormatter('Bitcoin') },
		//{ param: 'edgeless', valuesProvider: btcPriceProvider, valueTests: [(x) => { return x <= 0.00017300; } /*, (x) => { return x <= 0.50; }*/], message: priceFormatter('Edgeless') },	
		{ param: 'bitcoin-cash', valuesProvider: btcPriceProvider, valueTests: [(x) => { return x >= 0.2; } /*, (x) => { return x <= 0.50; }*/], message: priceFormatter('BCC') },
		//{ param: 'pivx', valuesProvider: btcPriceProvider, valueTests: [(x) => { return x >= 0.00075000	; } /*, (x) => { return x <= 0.50; }*/], message: priceFormatter('Pivx') },
		//{ param: 'antshares', valuesProvider: btcPriceProvider, valueTests: [(x) => { return x < 0.00254000; } /*, (x) => { return x <= 0.50; }*/], message: priceFormatter('Antshares') },
		//{ param: 'syndicate', valuesProvider: btcPriceProvider, valueTests: [(x) => { return x >= 0.00018734; } /*, (x) => { return x <= 0.50; }*/], message: priceFormatter('Antshares') },
		//{ param: 'ethereum', valuesProvider: priceProvider, valueTests: [(x) => { return x >= 235; }, (x) => { return x <= 205; }], message: priceFormatter('Ethereum') },
		//{ param: 'litecoin', valuesProvider: priceProvider, valueTests: [(x) => { return x >= 49; }, (x) => { return x <= 46; }], message: priceFormatter('Litecoin') },	
		//{ param: 'ripple', valuesProvider: priceProvider, valueTests: [(x) => { return x <= 0.18; }, (x) => { return x >= 0.23; }], message: priceFormatter('Ripple') },
		//{ param: 'golem-network-tokens', valuesProvider: priceProvider, valueTests: [(x) => { return x <= 	0.27; }, (x) => { return x >= 0.33; }], message: priceFormatter('Golem') },	
		//{ param: 'siacoin', valuesProvider: priceProvider, valueTests: [(x) => { return x <= 0.0065; }], message: priceFormatter('Siacoin') },
		//{ param: 'aragon', valuesProvider: priceProvider, valueTests: [(x) => { return x <= 1.5; }], message: priceFormatter('Aragon') },
		//{ param: 'eos', valuesProvider: priceProvider, valueTests: [(x) => { return x <= 1.6; }], message: priceFormatter('EOS') },
		//{ param: 'decred', valuesProvider: priceProvider, valueTests: [(x) => { return x <= 25; }], message: priceFormatter('Decred') },
		//{ param: 'digibyte', valuesProvider: btcPriceProvider, valueTests: [(x) => { return x >= 0.0000066; }, (x) => { return x <= 0.0000063; }], message: priceFormatter('DGB') },
		//{ param: 'DGB', valuesProvider: bittrexPriceProvider, valueTests: [(x) => { return x <= 0.0000055; }, (x) => { return x >= 0.0000063; }], message: priceFormatter('DGB') },
		//{ param: 'DASH', valuesProvider: bittrexPriceProvider, valueTests: [(x) => { return x >= 0.0775; }], message: priceFormatter('Dash') },
	]
}

const valueWatcher = require('./valueWatcher')(watcherOptions, notificationSender);

