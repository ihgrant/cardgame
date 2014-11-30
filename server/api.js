var express = require('express');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var Cardgame = require('./cardgame');

var api = express();

api.use(bodyParser.json()); // for parsing application/json
api.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
api.use(session({
	keys: ['key1', 'key2'] // placeholder keys
}));

api.post('login', function (req, res) {
	Cardgame.logIn({
		username: req.body.username,
		password: req.body.password
	}, function (err, result) {
		if (err) {
			res.status(500).send(err);
		} else {
			req.session.sessionId = result.sessionId;
			res.send(result);
		}
	});
});

api.get('start', function (req, res) { // ?game=xxx
	var gameType = req.query.game,
		userId = req.session.userId;

	Cardgame.startGame({
		userId: userId,
		gameType: gameType
	}, function (err, result) {
		if (err) {
			res.status(500).send(err);
		} else {
			req.session.gameId = result.gameId;
			res.send(result);
		}
	});
});

api.get('/cards/:type', function (req, res) { // return deck, given a type
	var type = req.params.type;
	var path = './data/cards/' + type + '.json';
	if (type === 'standard') {
	res.send(generateStandardDeck());
	} else {
	returnJSONFile(req, res, path);
	}
});

module.exports = api;
