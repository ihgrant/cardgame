/* shuffler.js */

var isArray = function (input, callback) {
	if (Object.prototype.toString.call(input) === '[object Array]') {
		callback(true);
	} else {
		callback(false);
	}
};

var random = function (x) {
	return Math.floor(x * (Math.random() % 1));
};

module.exports.shuffle = function (cards, callback) {
	var len = cards.length,
	k, t;

	isArray(cards, function (result) {
		if (!result) {
			callback('input must be an array.');
		} else {
			do { // swap last(decrementing-index) card with another card with index between that index and 0
				k = random(len--);
				t = cards[len];
				cards[len] = cards[k];
				cards[k] = t;
			} while (len);

			callback(null, cards);
		}
	});
};
