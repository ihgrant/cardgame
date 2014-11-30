morenotes.md

# initialization
-	on new game, get session id from server (and log session) and register user

# modules
-	shuffler
-	dealer
-	game state: deck, hand, board, discard/graveyard
	board is obviously going to differ based on game type
	deck: in order, unique id per card per player
		in backend this will need to correspond to unique id per game as well
	hand: in order, gameCardId
	graveyard: in order, gameCardId

# game state
-	history graph for each card in each deck with current board position
-	a history log for each event that occurs
