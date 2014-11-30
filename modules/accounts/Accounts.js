var fs = require('fs');

var path = '/data/users.json';

var openDatabase = function (callback) {
	fs.readFile(path, 'utf8', function (err, data) {
		if (err) {
			callback(err);
		} else {
			data = JSON.parse(data);
			callback(null, data);
		}
	});
};

var Accounts = {
	checkUser: function (user, callback) {
		openDatabase(function (err, data) {
			if (err) {
				callback(err);
			} else {
				if (!data[user]) {
					callback(null, 'allowed'); // username allowed
				} else if (data[user].password) {
					callback(null, 'password'); // username already taken; enter password
				} else {
					callback(null, 'temporary');
				}
			}
		});
	},
	checkPassword: function (user, pass, callback) {
		openDatabase(function (err, data) {
			if (err) {
				callback(err);
			} else {
				if (data[user] && data[user].password === password) {
					callback(null, true); // valid password
				} else {
					callback(null, false); // invalid password
				}
			}
		});
	},
	setPassword: function (user, pass, callback) {
		openDatabase(function (err, data) {
			if (err) {
				callback(err);
			} else {
				data[user] = {password: password};
				fs.writeFile(path, JSON.stringify(data), function (err) {
					if (err) {
						callback(err);
					} else {
						callback(null);
					}
				});
			}
		});
	}
};

module.exports = Accounts;
