I created this for myself, sharing it in case it may be useful to other people. The code quality should be decent, but I need to extract out the configuration params to a single file for easier customization.

Configure notifications
-----------------------
The services support sending local notifications on OSX, e-mail notifications and push notifications. If you are interested in push notifications contact me. Better to comment out the notification types you don't want for now.

1. Edit notificationSender.js
2. Replace 'GMAIL_ADDRESS' and 'GMAIL_APP_PASSWORD' by your gmail address. The password should be an application password (you generate one in Gmail).

Install dependencies
--------------------

Run this:

```bash
npm install
```

Price Monitoring
----------------

1. Edit index.js and enable one of the price options. You can choose Shapeshift, Changelly and Bittrex.

To monitor a price in Bittrex, enable one of the watched values:

```json
{ param: 'DASH', valuesProvider: bittrexPriceProvider, valueTests: [(x) => { return x >= 0.0775; }], message: priceFormatter('Dash') }
```
		
The value tests supports a list of conditions to evaluate. For example above, (x) => { return x >= 0.0775; } means a notification will be sent when the price is greater or equal to 0.0775 BTC.


2. Run the service
	```bash
	node index.js
	```

Dashboard
---------

To run the dashboard:

1. Edit bittrexClient.js and add your API key and secret. You generate them on the Bittrex account page. Do not share them.

2. Execute
	```bash
	node bittrex
	```
If everything went well you should be able to access the dashboard at localhost:9000