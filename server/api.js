var express = require('express');

var api = express()
// .get('/phones', function (req, res) {
//   returnJSONFile(req, res, './data/phones/phones.json');
// })
.get('/cards/:type', function (req, res) { // return deck, given a type
	var type = req.params.type;
	var path = './data/cards/' + type + '.json';
	if (type === 'standard') {
	res.send(generateStandardDeck());
	} else {
	returnJSONFile(req, res, path);
	}
});

module.exports = api;
