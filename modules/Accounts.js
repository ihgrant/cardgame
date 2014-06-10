var fs = require('fs');

var Accounts = {
	path: 'data/users.json',
	checkUser: function (user) {
		fs.readFileSync(path, 'utf8', function (err, data) {
			if (err) {
				res.status(404).send('Not found');
			}
			data = JSON.parse(data);
			if (!data[user]) {
				return 'allowed'; // username allowed
			} else if (data[user].password) {
				return 'password'; // username already taken; enter password
			} else {
				return 'temporary';
			}
		});
	},
	checkPassword: function (user, pass) {
		fs.readFileSync(path, 'utf8', function (err, data) {
			if (err) {
				res.status(404).send('Not found');
			}
			data = JSON.parse(data);
			if (data[user] && data[user].password === password) {
				return true; // valid password
			} else {
				return false; // invalid password
			}
		});
	},
	setPassword: function (user, pass) {
		fs.readFileSync(path, 'utf8', function (err, data) {
			if (err) {
				res.status(404).send('Not found');
			}
			data = JSON.parse(data);
			data[user] = {password: password};
			fs.writeFile(path, JSON.stringify(data), function (err) {
				if (err) throw err;
			});
		});
		//
	}
};

module.exports = Accounts;
