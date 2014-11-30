var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var War = require('./modules/War');
var Accounts = require('./modules/accounts');

var api = require('./api');

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
    var cardId = War.drawCard(user);
    game.emit('carddrawn', user, cardId);
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
