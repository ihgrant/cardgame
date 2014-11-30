### master games:
id
user ids (of players)
module id
gameStatus id

### modules:
id
name
path

### users:
id
username
password

### gameStatus:
id
description
(waiting, in progress, finished)

### war games
id
game id
user ids: {
	initial deck
	score
}
events: {
	id (turn #)
	winning user id
}
score

during each event, all players draw a card from their deck. the player with the highest value card wins all the cards
