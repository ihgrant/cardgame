var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var Q = require('q');
var War = require('./modules/War');
var Accounts = require('./modules/Accounts');

function returnJSONFile(req, res, filePath) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      res.status(404).send('Not found');
    }
    data = JSON.parse(data);
    res.send(data);
  });
}

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

var chat = io.of('/chat');
var game = io.of('/game');

chat.on('connection', function (socket) {
  socket.on('login', function (user) {
    if (!Accounts.checkUser(user)) {
      chat.emit('invalid');
    } else {
      chat.emit('valid');
    }
  });
  socket.on('usermessage', function (user, msg) {
    chat.emit('usermessage', user+': '+msg);
  });
});

game.on('connection', function (socket) {
  socket.on('startgame', function (user) { // log creation of a new game and send the session ID to user
    var sessionId = War.logSession(user);
    game.emit('startsession', sessionId);
  });

  socket.on('drawcard', function (user) { // log drawing of a card and send card id to user
    var cardid = War.drawCard(user);
    game.emit('carddrawn', user, cardid);
  });

  socket.on('compare', function (user, card1, card2) {
    game.emit('result', War.compare(card1, card2));
  });
});

app
  .use('/api', api)
  .use(express.static(__dirname + '/public')); // translate url '/' to 'public/'

http.listen(3000, function () {
  console.log('listening on *:3000');
});

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

function random(n) {
  var x = Math.floor(Math.random() * n);
  return x;
}

function sessionID(a,b) {
  for(b=a=''; a++<36; b+=a*51&52 ? (a^15 ? 8^Math.random()*(a^20?16:4):4).toString(16):'-');
  return b;
}
