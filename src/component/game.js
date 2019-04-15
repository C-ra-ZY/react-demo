import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../action";
import Board from "./board";
import RoundManager from "./roundManager";

class Game extends Component {
	render() {
		const { status, play, changeRound, currentRound, winner, history } = this.props;
		let nextPlayer = status.filter((e) => !!e).length % 2 ? "O" : "X";
		return (
			<div className="game">
				<div className="bar">
					<div className="status">
						{winner ? `the next winner: ${winner}` : `the next player: ${nextPlayer}`}
					</div>
					<div className="roundManager">
						<div>{"Round:"}</div>
						<RoundManager {...{ history, changeRound, currentRound }} />
					</div>
				</div>
				<Board {...{ status, play, nextPlayer, winner }} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

function mapDispatchToProps(dispatch) {
	return {
		play: (arg) => dispatch(action.play(arg)),
		changeRound: (arg) => dispatch(action.changeRound(arg))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
