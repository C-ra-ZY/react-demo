import React, {Component} from "react";
import {connect} from "react-redux";
import * as action from "../../action";
import Board from "./board";
import Square from "./square";
import RoundManager from "./roundManager";
import PropTypes from "prop-types";
import "./style.scss";

class Game extends Component {
  render() {
    const {status, play, winner} = this.props;
    let nextPlayer = status.filter(e => !!e).length % 2 ? "O" : "X";
    let width = Math.sqrt(status.length);

    return (
      <div className="game">
        <div className="bar">
          <div className="status">{winner ? `the winner is ${winner}` : `the next player: ${nextPlayer}`}</div>
          <RoundManager />
        </div>
        <Board {...{width, play, winner}}>
          {status.map((value, index) => {
            return <Square key={index}>{value || index}</Square>;
          })}
        </Board>
      </div>
    );
  }
}

Game.propTypes = {
  status: PropTypes.array.isRequired,
  play: PropTypes.func.isRequired,
  changeRound: PropTypes.func.isRequired,
  winner: PropTypes.string
};

function mapStateToProps(state) {
  const {status, winner} = state;
  return {status, winner};
}

function mapDispatchToProps(dispatch) {
  return {
    play: arg => dispatch(action.PLAY(arg)),
    changeRound: arg => dispatch(action.CHANGE_ROUND(arg))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
