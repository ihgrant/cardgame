/**
 * @jsx React.DOM
 */

var MenuPage = React.createClass({
	render: function() {
		return (
			<div className="container">
				<ul className="ul-clean">
					<li><a className="w-100 button" id="nav-newgame">New Game</a></li>
					<li><a className="w-100 button" id="nav-joingame">Join Game</a></li>
					<li><a className="w-100 button" id="nav-logout">Log Out</a></li>
				</ul>
			</div>
		);
	}
});
