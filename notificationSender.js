'use strict';

const nodemailer = require('nodemailer');
const notifier = require('node-notifier');
const path = require('path');
const apn = require('apn');

let apnOptions = {
    token: {
        key: path.join(__dirname, PATH_TO_CERTIFICATE),
        keyId: KEY_ID,
        teamId: TEAM_ID
    },
    production: false
};

let deviceToken = 'DEVICE_TOKEN';

let apnProvider = new apn.Provider(apnOptions);

module.exports = function notificationSender(options) {
	let defaults = {
        sendLocalNotification: true,
        sendEmail: true,
        sendPushNotification: false
    };
    options = Object.assign({}, defaults, options);

	let transporter = nodemailer.createTransport({
	    host: 'smtp.gmail.com',
	    port: 465,
	    secure: true, // secure:true for port 465, secure:false for port 587
	    auth: {
	        user: 'GMAIL_ADDRESS',
	        pass: 'GMAIL_APP_PASSWORD'
	    }
	});

	var send = function send(message, important) {
		console.log(message);

		if (options.sendLocalNotification && (important == null || important)) {
			notifier.notify(message);
		}

		if (options.sendEmail && (important == null || important)) {
			let mailOptions = {
			    from: 'GMAIL_ADDRESS',
			    to: 'GMAIL_ADDRESS',
			    subject: message,
			    text: message
			};
			transporter.sendMail(mailOptions, (error, info) => {
			    if (error) {
			        return console.log(error);
			    }
			});
		}	

        if (options.sendPushNotification && (important == null || important)) {
            let notification = new apn.Notification();
            notification.expiry = Math.floor(Date.now() / 1000) + 24 * 3600; // will expire in 24 hours from now
            notification.sound = "ping.aiff";
            notification.alert = { "title": message, "body": message }
            //notification.payload = {'messageFrom': userProfile.firstName, 'text': msg.text};
            
            // App bundle ID
            notification.topic = 'BUNDLE';
            // Send the actual notification
            apnProvider.send(notification, deviceToken).then( result => {
                // Show the result of the send operation:
                console.log(result);
            });
        }	
	}

	return {
		send: send
	}
}
