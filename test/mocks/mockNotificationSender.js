'use strict';

module.exports = function testNotificationSender() {

	var sentMessages = [];

	var send = function send(message) {
		this.sentMessages.push(message);
	}

	return {
		send,
		sentMessages
	}
}