module.exports.deal = function (players, deck, callback) {
	var playerdecks = players.map(function () {
		return [];
	}),
	num_players = players.length,
	playerdecks_length = Math.floor(deck / players.length);

	deck.forEach(function (card, i) {
		var player = i % num_players;

		if (playerdecks[player].length <= playerdecks_length) { // make sure we deal the same number of cards to each player (and don't deal leftovers)
			playerdecks[player].push(card);
		}
	});

	callback(null, playerdecks);
};
