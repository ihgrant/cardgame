var fs = require('fs');

var War = {
	ranks: {
		'ace': 0,
		'2': 1,
		'3': 2,
		'4': 3,
		'5': 4,
		'6': 5,
		'7': 6,
		'8': 7,
		'9': 8,
		'10': 9,
		'jack': 10,
		'queen': 11,
		'king': 12
	},
	logSession: function (user) {
		fs.readFileSync('data/war.json', 'utf8', function (err, data) {
			if (err) {
				res.status(404).send('Not found');
			}
			var sessionId = SessionID();
			data = JSON.parse(data);
			data[sessionId] = {
				player1: user,
				player2: 'cpu'
			};
			fs.writeFile('data/war.json', JSON.stringify(data), function (err) {
				if (err) throw err;
			});
			return sessionId;
		});
	},
	drawCard: function (user) {
		fs.readFile(filePath, 'utf8', function (err, data) {
			if (err) {
				res.status(404).send('Not found');
			}
			data = JSON.parse(data);
			res.send(data);
		});
	},
	compare: function (card1, card2) { // 1 if card1 beats card2, -1 if card2 wins, 0 if tie
		try {
			if (ranks[card1.name] > ranks[card2.name]) {
				return 1;
			} else if (ranks[card2.name] > ranks[card1.name]) {
				return -1;
			}
			return 0;
		} catch (e) {
			return e;
		}
	}
};

module.exports = War;
