var chat = io('/chat');

$(document).ready(function () {
	$('#gamespace, #menu').shards([0,122,0,.1],[0,255,0,.2],[0,255,120,.5],10,1,3,.5,true);
	initialize();
});

$('#nav-newgame').on('click', function () {
	goto('#game');
	War.startGame();
});

$('#btn-logoff').on('click', function () {
	localStorage.removeItem('username');
});

$('#btn-quitgame').on('click', function () {
	localStorage.removeItem('sessionId');
});

var War = (function () {
	var startGame = function () {
		var game = io('/game');
		game.emit('startgame', localStorage.username);
		game.on('startsession', function (session_id) {
			localStorage.sessionId = session_id;
		});
		game.on('carddrawn', function (user, cardid) {
			$('#gamespace').append( Sasquatch.getCardById(cardid) );
		});
		$('#btn-drawcard').on('click', function () {
			game.emit('drawcard', localStorage.username);
		});
	};

	return {
		startGame: startGame
	};
})(this);

var Chat = (function () {
	$('#chatlog form').submit(function () {
		var msg = $('#m').val();
		if (msg.length) {
			chat.emit('usermessage', localStorage.username, msg);
			$('#m').val('');
		}
		return false;
	});
})(this);

$('#btn-plus').on('click', function () {
	var size = $('body').css('font-size');
	size = size.substring(0, size.length - 2); // get rid of 'px'
	size = Number(size) + 2;
	localStorage.uiSize = size;
	$('body').css('font-size', size+'px');
});

$('#btn-minus').on('click', function () {
	var size = $('body').css('font-size');
	size = size.substring(0, size.length - 2); // get rid of 'px'
	size = Number(size) - 2;
	localStorage.uiSize = size;
	$('body').css('font-size', size+'px');
});

$('#chatlog').on('click', function () {
	$('#m').focus();
});

chat.on('usermessage', function (msg) {
	$('#messages').append($('<li>').text(msg));
});

function initialize() {
	if (!localStorage.username) localStorage.username = prompt('enter your username');
	if (localStorage.uiSize) $('body').css('font-size', localStorage.uiSize + 'px');

	Sasquatch.loadCards('standard')
	.done(function () {
		if (!localStorage.sessionId) {
			goto('#menu');
		} else {
			War.startGame();
			goto('#game');
		}
		console.log('done loading cards');
	})
	.fail(function () {
		console.log('failure');
	});
}

function goto(page) {
	$('.page').hide();
	$(page).show();
}

var Sasquatch = (function () {
	var cards = [];
	var getCardById = function (cardid) {
		var tmp = '<div class="card" draggable="true">'+
			'<div class="cardinterior">#cardname</div>'+
			'</div>',
		name = cards[cardid].name,
		suite = cards[cardid].suite;
		tmp = tmp.replace(/#cardname/g, name + ' of ' + suite);
		return tmp;
	};
	var loadCards = function (type) {
		var dfd = $.Deferred();
		getData('cards/'+type)
		.done(function (data) {
			cards = data;
			dfd.resolve();
		})
		.fail(function (msg) {
			dfd.reject(msg);
		});
		return dfd.promise();
	};
	var getData = function (target) {
		var dfd = $.Deferred();
		$.ajax({
			type: 'GET',
			url: 'api/'+target,
			dataType: 'json'
		})
		.done(function (data) {
			dfd.resolve(data);
		})
		.fail(function () {
			dfd.reject('Failure.');
		});
		return dfd.promise();
	};

	return {
		loadCards: loadCards,
		getCardById: getCardById
	};
})(this);
