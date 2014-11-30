var players = [
  'alice',
  'bob'
];
var deck = generateStandardDeck();
var playerdecks = dealCards(players, deck).map(function (deck, i) {
  return shuffle(deck);
});

playGame(players, playerdecks);

function playGame(players, playerdecks) { // loop until the game is over
  do {
    playerdecks = drawAndCompare(players, playerdecks);

    var log = playerdecks.map(function (deck, i) {
      return players[i]+': '+deck.length;
    }).join(', ');
    console.log(log);
  } while (!gameOver(playerdecks));
}

function drawAndCompare(players, playerdecks) { // given each player's deck, draw next cards and return the players' decks given result of the round
  var currentDraw = players.map(function (player, i) {
    return playerdecks[player].pop();
  }),
  winnerIndex = compare(currentDraw);

  if (winnerIndex !== -1) {
    playerdecks[winnerIndex].splice(currentDraw); // TODO: append entire current draw to winner's deck
  } else {
    playerdecks = drawAndCompare(players, playerdecks);
  }
  return playerdecks;
}

function compare(cards) { // return index of highest rank card, given each players' draw
  var highest = -1,
  highestIndex = -1;

  cards.forEach(function (card, i) {
    var rank = rank(card.name);

    if (rank > highest) {
      highest = rank;
      highestIndex = i;
    }
  });
  return highestIndex;
}

function rank(card) { // return rank of card, given name
  var ranks = {
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
  };
  return ranks[card];
}

function gameOver(playerdecks) { // return if game is over (any player deck is empty)
  var gameIsOver = false;
  playerdecks.forEach(function (deck) {
    if (deck.length === 0) {
      gameIsOver = true;
    }
  });
  return gameIsOver;
}

function generateStandardDeck() {
  var deck = [],
  suites = ['diamonds', 'clubs', 'hearts', 'spades'],
  Card = function (s, n) {
    this.suite = s;
    this.name = n.toString();
    return this;
  };

  suites.forEach(function (suite) {
    for (var y = 0; y < 13; y++) {
      switch (y) {
        case (0):
          deck.push(new Card(suite, 'ace'));
          break;
        case (11):
          deck.push(new Card(suite, 'jack'));
          break;
        case (12):
          deck.push(new Card(suite, 'queen'));
          break;
        case (13):
          deck.push(new Card(suite, 'king'));
          break;
        default:
          deck.push(new Card(suite, y));
          break;
      }
    }
  });

  return deck;
}

function dealCards(players, deck) {
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

  return playerdecks;
}

function shuffle(cards) {
  var len = cards.length,
  k, t;

  do { // swap last(decrementing-index) card with another card with index between that index and 0
    k = random(len--);
    t = cards[len];
    cards[len] = cards[k];
    cards[k] = t;
  } while (len);
  return cards;
}

function random(x) {
  return Math.floor(x * (Math.random() % 1));
}
