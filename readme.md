# cardgame engine

a browser-based engine for running multiplayer card games.

## GOALS
- no account required
	- can tie user name to email if you want to keep it from being used
	- otherwise, choose anything (that isn't taken)
	- much like IRC
- URL represents game ID: http://xx/Game/GameID where Game is the game (poker, war, whatever) and GameID is a unique ID
	- if you are a user participating and your browser crashes, you can go back to the same URL to continue playing
	- if you are not a user participating, you can spectate
	- if the game is over, you can replay the events of the game
- option to play random matched game (ELO rankings maybe?)
- option to play vs specific user
- option to play vs AI (hard to do, huh?)

## TODO
- integrate Q promises for file reading and writing
- page routing / ui with React
- session security (https://hacks.mozilla.org/2012/12/using-secure-client-side-sessions-to-build-simple-and-scalable-node-js-applications-a-node-js-holiday-season-part-3/)
- persistent game info not in json files (db)
- new game / join game functionality
	- new game: create new game and join it
	- join game: show list of games that can be joined
- actual game logic
- game logic on per module basis?
